import React, { useState } from 'react';
import { AuthBody } from '../../components/Auth/AuthBody';
import { AuthForm } from '../../components/Auth/AuthInputForm';
import { AuthHeader } from '../../components/Auth/AuthHeader';
import { AuthSubmit } from '../../components/Auth/AuthSubmit';
import { AuthLoginOptions } from '@renderer/components/Auth/AuthLoginOptions';
import { reqAuthChangePassword } from '@renderer/api/requests';
import './Auth.scss';

const Login = () => {
    const [validateToken, setValidateToken] = useState(false);
    const [data, setData] = useState({
        token: '',
        newPassword: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState({
        token: '',
        newPassword: '',
        repeatPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });

        handleValidation(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        handleValidation(name, value);
    };

    const handleValidation = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'token':
                if (value.trim() === '') {
                    newErrors.token = 'Por favor, ingresa tu token.';
                } else {
                    newErrors.token = '';
                }
                break;
            case 'newPassword':
                if (value.trim() === '') {
                    newErrors.newPassword = 'Por favor, ingresa tu nueva contraseña.';
                } else if (value.trim().length < 8) {
                    newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres.';
                } else {
                    newErrors.newPassword = '';
                }
                break;
            case 'repeatPassword':
                if (value !== data.newPassword) {
                    newErrors.repeatPassword = 'Las contraseñas no coinciden.';
                } else {
                    newErrors.repeatPassword = '';
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const newErrors = {
            ...errors,
            token: '',
            repeatPassword: '',
        };

        if (data.token.trim() === '') {
            newErrors.token = 'Por favor, ingresa tu token.';
        }

        if (data.newPassword.trim() === '') {
            newErrors.newPassword = 'Por favor, ingresa tu nueva contraseña.';
        }

        if (data.repeatPassword.trim() === '') {
            newErrors.repeatPassword = 'Por favor, repite tu contraseña.';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) {
            return;
        }

        try {
            const requestBody = {
                token: data.token,
                newPassword: data.newPassword,
            };

            await reqAuthChangePassword(requestBody);
            console.log('Contraseña cambiada exitosamente.');
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setErrors({ ...errors, newPassword: 'Error al cambiar la contraseña. Inténtalo nuevamente.' });
        }
    };

    const tokenInputs = [
        {
            label: 'Token',
            name: 'token',
            type: 'text',
            placeholder: 'Ingresa tu token',
            onBlur: handleBlur,
            onChange: handleChange,
            value: data.token,
        },
    ];

    const passwordInputs = [
        {
            label: 'New Password',
            name: 'newPassword',
            type: 'password',
            placeholder: 'Ingresa tu nueva contraseña',
            onBlur: handleBlur,
            onChange: handleChange,
            value: data.newPassword,
        },
        {
            label: 'Repeat Password',
            name: 'repeatPassword',
            type: 'password',
            placeholder: 'Repite tu contraseña',
            onBlur: handleBlur,
            onChange: handleChange,
            value: data.repeatPassword,
        },
    ];

    return (
        <AuthBody onClick={handlePasswordChange}>
            <AuthHeader title='Change your password' description='Change your password' />
            <AuthForm inputs={tokenInputs} handleChange={handleChange} errors={errors} />
            <AuthForm inputs={passwordInputs} handleChange={handleChange} errors={errors} />
            <AuthLoginOptions />
            <AuthSubmit label='Cambiar contraseña' />
        </AuthBody>
    );
};

export default Login;

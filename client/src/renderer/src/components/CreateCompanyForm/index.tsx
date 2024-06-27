import React, { useState, useEffect } from 'react';
import './createCompany.scss';
import Logo from "../../assets/electron.svg"
import { Button, Input } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react"

interface MultiStepFormProps {
    onClose: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = React.useState(true)

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    useEffect(() => {
        // Bloquea el scroll del cuerpo cuando el componente está montado
        document.body.style.overflow = 'hidden';
        return () => {
            // Restaura el scroll del cuerpo cuando el componente se desmonta
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [email, setEmail] = React.useState('');
    const validateEmail = (value) => {
        // Expresión regular para validar el correo electrónico
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    };

    const isInvalid = React.useMemo(() => {
        // Validar el correo electrónico cuando el valor no esté vacío
        return email === '' || !validateEmail(email);
    }, [email]);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
            <div className="animate-zoom-in-out w-full max-w-3xl py-8 px-48 bg-white rounded shadow-lg relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-6">
                    <div className='flex justify-center items-center'>
                        <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '27px' }}>You're only 2 steps away from starting your gantt chart</h1>
                    <h2 className="text-lg font-medium mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Create your FREE account and get immediate access to the app</h2>
                    <p className="mb-4 text-sm font-medium text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>Step {step} of 1</p>
                </div>
                <div className="flex justify-center mb-6">
                    <div onClick={prevStep} className={`w-8 h-3 mx-1 rounded ${step === 1 ? 'bg-c-primary' : 'bg-gray-100'}`}></div>
                </div>
                {step === 1 && (
                    <div className=''>
                        <Input
                            type="email"
                            variant="bordered"
                            label="Email"
                            value={email}
                            radius='sm'
                            // color={isInvalid ? "danger" : "primary"}
                            // onChange={handleChange}
                            // isInvalid={isInvalid}
                            placeholder="Enter your email"
                            errorMessage="Please enter a valid email"
                            className="mb-4"
                        />
                        <Input
                            type="email"
                            variant="bordered"
                            label="Email"
                            value={email}
                            radius='sm'
                            // color={isInvalid ? "danger" : "primary"}
                            // onChange={handleChange}
                            // isInvalid={isInvalid}
                            placeholder="Enter your email"
                            errorMessage="Please enter a valid email"
                            className="mb-4"
                        />
                        {/* <Input type="email" label="Email" placeholder="Enter your email" className="mb-4" /> */}

                        <Button color="secondary" className='w-full' isLoading={loading}>
                            {loading ? 'Cargando ...' : 'Crear'}
                        </Button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default MultiStepForm;


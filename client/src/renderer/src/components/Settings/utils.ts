import React, { useState } from 'react'
import { useDisclosure } from '@nextui-org/react';

export const useColorManagement = () => {
    const [colors, setColors] = React.useState([
        { color: '#3b82f6', icon: true, name: 'blue' },
        { color: '#ef4444', icon: false, name: 'red' },
     { color: '#8b5cf6', icon: false, name: 'violet' },
        { color: '#ec4899', icon: false, name: 'pink' },
    ])

    const [color, setColor] = React.useState({
        color: '',
        icon: false,
        name: '',
    });

    const [errorMessage, setErrorMessage] = React.useState({
        field: '',
        text: ''
    })

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleOpen = () => {
        onOpen();
    };

    const onCloseAndClear = () => {
        setErrorMessage({ field: '', text: '' });
        onClose()
    }

    const addColor = (e) => {
        e.preventDefault();

        // Validación: Verificar que el color no esté ya creado
        const colorExists = colors.some((item) => item.color === color.color);
        if (colorExists) {
            setErrorMessage({ field: 'color', text: 'Este color ya está creado.' });
            return;
        }

        // Validación: Verificar que el nombre sea único
        const nameExists = colors.some((item) => item.name.toLowerCase() === color.name.toLowerCase());
        if (nameExists) {
            setErrorMessage({ field: 'name', text: 'Este nombre ya está en uso.' });
            return;
        }

        // Validación: Verificar que los campos no estén vacíos
        if (color.name === '') {
            setErrorMessage({ field: 'name', text: 'Debe contener nombre' });
            return;
        } else if (color.color === '') {
            setErrorMessage({ field: 'color', text: 'Debes seleccionar un color' });
            return;
        }

        // Si no hay errores, agregar el color a la lista
        setColors([...colors, color]);
        onCloseAndClear();
    };
    return {
        colors,
        setColors,
        color,
        setColor,
        errorMessage,
        setErrorMessage,
        drawerOpen,
        setDrawerOpen,
        addColor,
        onCloseAndClear,
        onOpen,
        isOpen,
        toggleDrawer,
        handleOpen,
    };
}

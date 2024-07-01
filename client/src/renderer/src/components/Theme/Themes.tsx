import React from 'react';
import { useDisclosure } from '@nextui-org/react';

export const Themes = {
    night: {
        name: 'dark',
    },
    light: {
        name: 'light',
    },
};

export const useColorManagement = () => {
    const [colors, setColors] = React.useState([
        { name: 'blue', color: '#3b82f6', variant: 'variantOne' },
        { name: 'red', color: '#ef4444', variant: 'variantTwo' },
        { name: 'violet', color: '#8b5cf6', variant: 'variantThree' },
        { name: 'pink', color: '#ec4899', variant: 'variantFour' },
        { name: 'orange', color: '#ff9900', variant: 'variantFive' }
    ]);

    const [color, setColor] = React.useState({ name: '', color: '', variant: '' });
    const [errorMessage, setErrorMessage] = React.useState({ field: '', text: '' });

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
        onClose();
    };

    const addColor = (e: React.FormEvent) => {
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
        setColor,
        color,
        handleOpen,
        addColor,
        isOpen,
        onCloseAndClear,
        errorMessage
    };
};

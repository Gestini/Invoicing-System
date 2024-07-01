import React from 'react';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import { useColorManagement } from './Themes';
import { FaCheck, FaPlus } from 'react-icons/fa';

const MainColor: React.FC = () => {
    const [mainColor, setMainColor] = React.useState({ name: '', color: '', variant: '' });
    const [selected, setSelected] = React.useState(0);
    const {
        colors,
        setColors,
        setColor,
        color,
        handleOpen,
        addColor,
        isOpen,
        onCloseAndClear,
        errorMessage
    } = useColorManagement();

    const handleChangeColor = (index: number) => {
        const selectedColor = colors[index];
        setMainColor(selectedColor);
        console.log(selectedColor)
        setSelected(index);
        document.body.id = selectedColor.variant;
        localStorage.setItem('mainColor', selectedColor.variant);
    };

    React.useEffect(() => {
        const savedColorKey = localStorage.getItem('mainColor');
        if (savedColorKey) {
            const savedColorIndex = colors.findIndex(c => c.variant === savedColorKey);
            if (savedColorIndex !== -1) {
                const savedColor = colors[savedColorIndex];
                setMainColor(savedColor);
                setSelected(savedColorIndex);
                document.body.id = savedColorKey;
            }
        } else {
            document.body.id = 'variantOne';
        }
    }, [colors]);

    return (
        <>
            <span className='font-medium text-c-title'>Theme Colors</span>
            <div className='flex flex-wrap gap-2 mt-2'>
                {colors.map((item, index) => (
                    <Tooltip key={index} content={item.name} className='text-c-title'>
                        <div
                            className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center`}
                            style={{ backgroundColor: item.color }}
                            onClick={() => handleChangeColor(index)}
                        >
                            {selected === index && <FaCheck className='text-white h-3 w-3' />}
                        </div>
                    </Tooltip>
                ))}
                {/* <Tooltip content="crear">
                    <div
                        className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-gray-300`}
                        onClick={handleOpen}
                    >
                        <FaPlus className='text-white h-3 w-3' />
                    </div>
                </Tooltip>

                <Modal backdrop='blur' isOpen={isOpen} onClose={onCloseAndClear}>
                    <ModalContent>
                        <>
                            <form onSubmit={addColor}>
                                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                <ModalBody>
                                    <p>Choose a theme color</p>
                                    <Input
                                        type="text"
                                        variant='bordered'
                                        label="Name"
                                        onChange={(e) => setColor({ ...color, [e.target.name]: e.target.value })}
                                        value={color.name}
                                        name='name'
                                        maxLength={10}
                                        errorMessage={errorMessage.field === 'name' ? errorMessage.text : ''}
                                        isInvalid={errorMessage.field === 'name'}
                                    />
                                    <div>
                                        <div className="inline-block w-10 h-10 rounded-full overflow-hidden">
                                            <input
                                                type="color"
                                                className="w-full h-full border-none p-0 rounded-full cursor-pointer"
                                                value={color.color}
                                                onChange={(e) => setColor({ ...color, [e.target.name]: e.target.value })}
                                                name='color'
                                            />
                                        </div>
                                        <span className='text-[#f31260] block text-xs'>
                                            {errorMessage.field === 'color' && errorMessage.text}
                                        </span>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onCloseAndClear}>
                                        Close
                                    </Button>
                                    <Button
                                        color="primary" type='submit'
                                    >
                                        Crear
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    </ModalContent>
                </Modal> */}
            </div>
        </>
    );
};

export default MainColor;

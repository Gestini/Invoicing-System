import { Button, Checkbox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip } from "@nextui-org/react";
import React from 'react';
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useColorManagement } from './utils';
import { ChangeTheme } from "../Theme";

const Index = () => {
    const {
        colors,
        setColors,
        color,
        setColor,
        errorMessage,
        drawerOpen,
        addColor,
        onCloseAndClear,
        isOpen,
        toggleDrawer,
        handleOpen,
    } = useColorManagement();

    const selectColor = (index) => {
        const updatedColors = colors.map((item, idx) => ({
            ...item,
            icon: idx === index
        }));
        setColors(updatedColors);
    };

    React.useEffect(() => {
        console.log(colors)
    }, [colors])

    const handleChangeColor = (e) => {
        setColor({
            ...color,
            [e.target.name]: e.target.value,
        })
        console.log(color)
    }

    return (
        <>
            <div className="text-center absolute right-[10vh] bottom-[4vw]">
                <button
                    className="text-white rounded-full transition-all duration-300 bg-[var(--c-primary)] hover:bg-[var(--c-primary-hover)] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button"
                    onClick={toggleDrawer}
                >
                    <IoSettingsOutline className='w-7 h-7' />
                </button>
            </div>

            <div
                id="drawer-navigation"
                className={`fixed top-0 right-0 z-40 w-60 h-screen p-4 overflow-y-auto shadow-sm transition-transform ${drawerOpen ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800`}
                tabIndex={-1}
                aria-labelledby="drawer-navigation-label"
            >
                <h5 id="drawer-navigation-label" className="text-base font-semibold mb-5 text-[var(--c-title)]">Settings</h5>
                <hr />
                <button
                    type="button"
                    onClick={toggleDrawer}
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className='mt-3'>
                    <span className='font-medium text-[var(--c-title)]'>Theme Option</span>
                    <ChangeTheme />
                </div>

                <div>
                    <span className='font-medium text-[var(--c-title)]'>Theme Colors</span>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {colors.map((item, index) => (
                            <Tooltip key={index} content={item.name}>
                                <div
                                    className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center"
                                    style={{ backgroundColor: item.color }}
                                    onClick={() => selectColor(index)}
                                >
                                    {item.icon && <FaCheck className='text-white h-3 w-3' />}
                                </div>
                            </Tooltip>
                        ))}
                        <Tooltip content="crear">
                            <div
                                className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-gray-300`}
                                onClick={handleOpen}
                            >
                                <FaPlus className='text-white h-3 w-3' />
                            </div>
                        </Tooltip>
                    </div>
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
                                            onChange={handleChangeColor}
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
                                                    onChange={handleChangeColor}
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
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Index;

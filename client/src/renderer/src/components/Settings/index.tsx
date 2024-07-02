import React from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { ChangeTheme } from "../Theme";
import MainColor from "../Theme/MainColor";
import { useColorManagement } from './utils';
import { Button } from '@nextui-org/react';
import { SlOptions } from 'react-icons/sl';

const Index = () => {
    const {
        colors,
        setColors,
        drawerOpen,
        toggleDrawer,
    } = useColorManagement();

    return (
        <>
            {/* <div className="text-center absolute  z-10 right-[10vh] bottom-[4vw]">
                <button
                    className="text-white rounded-full transition-all duration-300 bg-c-primary hover:bg-c-primary-hover focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-4 focus:outline-none"
                    type="button"
                    onClick={toggleDrawer}
                >
                    <IoSettingsOutline className='w-7 h-7' />
                </button>
            </div> */}



            <SlOptions onClick={toggleDrawer} className='text-gray-300 w-4 h-4 cursor-pointer' />


            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-10 z-10"
                    onClick={toggleDrawer}
                />)}


            {drawerOpen && (
                <div
                    id="drawer-navigation"
                    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 rounded-lg w-96 h-auto max-h-screen p-4 overflow-y-auto shadow-sm transition-transform ${drawerOpen ? 'opacity-100' : 'opacity-0'} bg-white dark:bg-gray-800`}
                    tabIndex={-1}
                    aria-labelledby="drawer-navigation-label"
                >

                    <h5 id="drawer-navigation-label" className="text-base font-semibold mb-5 text-c-title">Settings</h5>
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
                        <span className='font-medium text-c-title'>Theme Option</span>
                        <ChangeTheme />
                    </div>
                    <div>
                        <MainColor />
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;

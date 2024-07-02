import React from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { ChangeTheme } from "../Theme";
import MainColor from "../Theme/MainColor";
import { useColorManagement } from './utils';

const Index = () => {
    const {
        colors,
        setColors,
        drawerOpen,
        toggleDrawer,
    } = useColorManagement();

    return (
        <>
            <div className="text-center absolute  z-10 right-[10vh] bottom-[4vw]">
                <button
                    className="text-white rounded-full transition-all duration-300 bg-c-primary hover:bg-c-primary-hover focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
        </>
    );
};

export default Index;

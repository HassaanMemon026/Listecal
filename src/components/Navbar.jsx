import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ darkMode, handleToggle }) => {
    const [isHamBurgerOpen, setIsHamBurgerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleHamBurger = () => {
        setIsHamBurgerOpen(true);
        setIsClosing(false);
    };

    const handleCloseMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsHamBurgerOpen(false);
        }, 400); // match animation duration
    };


    return (
        <nav className="w-full z-50 top-0 sticky bg-white shadow-md p-3.5 flex justify-between items-center">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Listecal</h1>
                {/* Hamburger Icon for Mobile View */}
                <span><FaBars onClick={handleHamBurger} className="md:hidden flex text-2xl text-gray-700 cursor-pointer" /></span>
                {/* Navigation Links (Desktop) */}
                <ul className="hidden md:flex space-x-5 mr-6">
                    <li className="text-gray-700 cursor-pointer my-auto hover:text-gray-950"><a href="/">Home</a></li>
                    <li className="text-gray-700 cursor-pointer my-auto hover:text-gray-950"><a target="__blank" href="https://github.com/HassaanMemon026">About</a></li>
                    <li className="text-gray-700 cursor-pointer my-auto hover:text-gray-950"><a href="">Your-Tasks</a></li>
                    <ThemeToggle handleToggle={handleToggle} darkMode={darkMode} />
                </ul>
                {/* Navigation Links (Mobile) */}
                {isHamBurgerOpen && (
                    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-xs z-50 flex">
                        <ul
                            id="mobileMenu"
                            className={`relative bg-white w-3/4 max-w-xs h-full p-6 shadow-lg transform 
        ${isClosing ? 'animate-slideOut' : 'animate-slideIn'}
        flex flex-col space-y-6`}
                        >
                            {/* Logo and Close Button */}
                            <li className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-gray-800">Listecal</span>
                                <button
                                    id="closeMenu"
                                    onClick={handleCloseMenu}
                                    className="text-3xl text-black hover:text-gray-600 transition"
                                >
                                    ✖
                                </button>
                            </li>

                            <li className="flex items-center text-lg font-medium text-black hover:text-gray-800 transition">
                                <span className="text-xl">🏠</span> <a className="ml-2" href="/">Home</a>
                            </li>
                            <li className="flex items-center text-lg font-medium text-black hover:text-gray-800 transition">
                                <span className="text-xl">ℹ️</span> <a className="ml-2" target="__blank" href="https://github.com/HassaanMemon026">About</a>
                            </li>
                            <li className="flex items-center text-lg font-medium text-black hover:text-gray-800 transition">
                                <span className="text-xl">📝</span> <a className="ml-2" href="">Your Tasks</a>
                            </li>

                            <ThemeToggle handleToggle={handleToggle} darkMode={darkMode} />
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};


export default Navbar;
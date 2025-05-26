import React from 'react';

const ThemeToggle = ({ darkMode, handleToggle }) => {
    return (
        <div className={`flex items-center justify-center ${darkMode ? 'invert' : ''}`}>
            <label
                className={`relative w-[55px] h-[26px] rounded-full ${darkMode ? 'bg-[#2f2f2f]' : 'bg-[#e0e0e0]'
                    } transition-colors duration-300 ease-in-out cursor-pointer`}
            >
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    className="hidden"
                />
                <span
                    className={`absolute top-[2px] ${darkMode ? 'left-[31px] bg-[#f1c40f] text-[#333]' : 'left-[2px] bg-[#4a90e2] text-white'
                        } w-[22px] h-[22px] rounded-full flex items-center justify-center text-[13px] transition-all duration-300 ease-in-out`}
                >
                    {darkMode ? '🌙' : '☀️'}
                </span>
            </label>
        </div>
    );
};

export default ThemeToggle;



import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

type Theme = 'light' | 'dark';

interface HeaderProps {
    maxSize: number;
    onSizeChange: (newSize: string) => void;
    isAnimating: boolean;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
    isFastMode: boolean;
    onFastModeToggle: (isFast: boolean) => void;
    onInfoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ maxSize, onSizeChange, isAnimating, theme, onThemeChange, isFastMode, onFastModeToggle, onInfoClick }) => {
    const [sizeInput, setSizeInput] = useState<string>(maxSize.toString());

    const handleSizeChange = () => {
        onSizeChange(sizeInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSizeChange();
        }
    };


    const handleThemeToggle = () => {
        if (theme === 'dark') { 
            onThemeChange('light');
        } else if (theme === 'light') {
            onThemeChange('system');
        } else {
            onThemeChange('dark');
        }
    };

    return (
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl shadow-md backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900">
                    CQ
                </div>
                <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Circular Queue Visualizer</h1>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center gap-2">
                    <label htmlFor="fast-mode" className="font-semibold text-gray-600 dark:text-gray-300 cursor-pointer select-none">Fast Mode</label>
                    <button
                        role="switch"
                        aria-checked={isFastMode}
                        onClick={() => onFastModeToggle(!isFastMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFastMode ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFastMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                 <div className="flex items-center gap-2">
                    <label htmlFor="max-size" className="font-semibold text-gray-600 dark:text-gray-300">Max Size:</label>
                    <input
                        id="max-size"
                        type="number"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isAnimating}
                        className="w-20 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-center focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                        min="3"
                        max="10"
                    />
                    <button
                        onClick={handleSizeChange}
                        disabled={isAnimating}
                        className="bg-teal-600 text-white font-bold py-1 px-4 rounded-md hover:bg-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-200"
                    >
                        Set
                    </button>
                </div>
                <button onClick={handleThemeToggle} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    {theme === 'dark' ? <SunIcon className="w-5 h-5 text-yellow-400" /> : theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-700" /> : <span className="w-5 h-5 text-gray-500 font-bold">A</span>}
                </button>
                <button 
                    onClick={onInfoClick}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    title="About"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
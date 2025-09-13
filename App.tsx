import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PieVisualizer from './components/PieVisualizer';
import Controls from './components/Controls';
import CodeDisplay from './components/CodeDisplay';
import { useCircularQueue } from './hooks/useCircularQueue';
import StateChart from './components/StateChart';
import AboutSection from './components/AboutSection';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [theme, setTheme] = useState<Theme | 'system'>(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'light' || localStorage.theme === 'dark') {
                return localStorage.theme;
            }
        }
        return 'system';
    });
    const [isFastMode, setIsFastMode] = useState(false);


    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'system') {
          
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', isDark);
            root.classList.toggle('light', !isDark);
            localStorage.removeItem('theme');
        } else {
            root.classList.toggle('dark', theme === 'dark');
            root.classList.toggle('light', theme === 'light');
            localStorage.theme = theme;
        }
    }, [theme]);


    useEffect(() => {
        if (theme !== 'system') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            const root = window.document.documentElement;
            root.classList.toggle('dark', e.matches);
            root.classList.toggle('light', !e.matches);
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [theme]);
    
    const {
        state,
        setNewMaxSize,
        enqueue,
        dequeue,
    } = useCircularQueue(10, isFastMode);

    const {
        data,
        front,
        rear,
        maxSize,
        isFull,
        isEmpty,
        feedback,
        isAnimating,
        highlightedLine,
        activeAction,
        errorState,
        updatingPointer,
    } = state;

    const [showStateTable, setShowStateTable] = useState(false);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 lg:p-4 transition-colors duration-300">
            <Header
                maxSize={maxSize}
                onSizeChange={setNewMaxSize}
                isAnimating={isAnimating}
                theme={theme}
                onThemeChange={setTheme}
                isFastMode={isFastMode}
                onFastModeToggle={setIsFastMode}
                onInfoClick={() => setShowAbout(true)}
            />
            <AboutSection 
                visible={showAbout}
                onClose={() => setShowAbout(false)}
            />
            <main className="flex-grow grid grid-cols-1 lg:grid-cols-7 gap-6 mt-2">
                <div className="lg:col-span-4 flex items-center justify-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-lg relative min-h-[400px] lg:min-h-0">
                    <button 
                        onClick={() => setShowStateTable(!showStateTable)}
                        className="absolute top-4 left-4 z-20 bg-gray-200 dark:bg-gray-700/80 backdrop-blur-sm text-xs font-semibold py-1 px-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Toggle State Table
                    </button>
                    {showStateTable && <StateChart maxSize={maxSize} />}
                    <PieVisualizer 
                        data={data} 
                        front={front} 
                        rear={rear} 
                        maxSize={maxSize} 
                        updatingPointer={updatingPointer} 
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                         <Controls
                            onEnqueue={enqueue}
                            onDequeue={dequeue}
                            isFull={isFull}
                            isEmpty={isEmpty}
                            isAnimating={isAnimating}
                            feedback={feedback}
                            errorState={errorState}
                        />
                    </div>
                </div>
                <div className="lg:col-span-3 flex flex-col">
                    <CodeDisplay
                        highlightedLine={highlightedLine}
                        activeAction={activeAction}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;
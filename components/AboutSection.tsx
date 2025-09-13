import React, { useEffect, useCallback } from 'react';

interface AboutSectionProps {
    visible: boolean;
    onClose: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ visible, onClose }) => {
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (visible) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [visible, handleEscape]);

    if (!visible) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 relative animate-fadeIn scale-95"
            >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div className="space-y-8 overflow-hidden pr-2">
                <div className="text-center">
                <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">Circular Queue Visualizer</h2>
            
                <p className="text-gray-600 dark:text-gray-300">Made with love and vibe coding by Homer Adriel Dorin</p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Ma'am Peña People represent! 🎓✊</p>
                </div>

                <div>
                <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-3 flex items-center gap-2">
                    <span>Why This Visualizer?</span>
                </h3>
                <div className="space-y-3">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
                        See it in a Pie 🥧
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        Because drawing this stuff on paper is a pain, and imagining front and rear in your head is even worse. From my knowledge, there is no proper circular array visualizer online.
                        In this visualizer, front and rear pointers actually move around a circle, just like how we were taught in class—drawn like a pie.
                    </p>
                    <p className="pt-2 text-m text-teal-700 dark:text-teal-300 shadow-sm">
                        This project makes the whole thing click for me better <span className="italic text-teal-500 dark:text-teal-400">(plus I was bored ig)</span>.
                    </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
                        <span>Step Along with the Code</span>
                        <span>💡</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        Every time you enqueue or dequeue, the code lights up line by line so you can finally connect the theory with what's happening.
                    </p>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2">
                        <span>A Bit of Eye Candy</span>
                        <span>✨</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        Smooth transitions, arrows that glide, slices that light up—I honestly just needed a reason to play around with AnimeJS : /
                    </p>
                    </div>
                </div>
                </div>

                <div>
                <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">Tech Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">⚛️ React</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">🎨 Tailwind CSS</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">📘 TypeScript</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">💻 VS Code</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">🎬 Anime.js</span>
                    </div>
                    <div className="bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg text-center transform transition-all hover:scale-105 hover:bg-white/70 dark:hover:bg-gray-900/70 cursor-default">
                    <span className="font-medium">⚡ Vite</span>
                    </div>
                </div>
                </div>

                <div className="text-center pt-4">
                <a 
                    href="https://github.com/peaceyyy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-lg hover:bg-teal-500 dark:hover:bg-purple-600 transition-all transform hover:scale-105"
                    aria-label="Visit my GitHub profile"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Check me out on Github!
                </a>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AboutSection;
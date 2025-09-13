import React, { useRef, useEffect } from 'react';

declare const anime: any;

interface ControlsProps {
    onEnqueue: (elem?: string) => void;
    onDequeue: () => void;
    isFull: boolean;
    isEmpty: boolean;
    isAnimating: boolean;
    feedback: string;
    errorState: 'full' | 'empty' | null;
}

const Controls: React.FC<ControlsProps> = ({
    onEnqueue,
    onDequeue,
    isFull,
    isEmpty,
    isAnimating,
    feedback,
    errorState,
}) => {
    const enqueueButtonRef = useRef<HTMLButtonElement>(null);
    const dequeueButtonRef = useRef<HTMLButtonElement>(null);

    const handleEnqueue = () => {
        onEnqueue();
    };

    useEffect(() => {
        if (errorState) {
            const target = errorState === 'full' ? enqueueButtonRef.current : dequeueButtonRef.current;
            if (target) {
                anime({
                    targets: target,
                    translateX: [
                        { value: -6, duration: 50 },
                        { value: 6, duration: 50 },
                        { value: -6, duration: 50 },
                        { value: 6, duration: 50 },
                        { value: 0, duration: 50 }
                    ],
                    easing: 'easeInOutSine'
                });
            }
        }
    }, [errorState]);

    return (
        <div className="flex flex-col items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
                <button
                    ref={enqueueButtonRef}
                    onClick={handleEnqueue}
                    disabled={isAnimating || isFull}
                    className="bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-200 transform active:scale-95"
                >
                    Enqueue
                </button>
                <button
                    ref={dequeueButtonRef}
                    onClick={onDequeue}
                    disabled={isAnimating || isEmpty}
                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-200 transform active:scale-95"
                >
                    Dequeue
                </button>
            </div>
             <div className="mt-1 text-center h-6 flex items-center justify-center min-w-[200px]">
                 <p className={`font-mono text-sm transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'}
                    ${errorState ? 'text-red-500 dark:text-red-400' : 'text-teal-600 dark:text-teal-300'}`}>
                    {feedback || ''}
                </p>
            </div>
        </div>
    );
};

export default Controls;
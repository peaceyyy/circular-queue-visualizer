import React from 'react';

interface PointerInfoProps {
    front: number;
    rear: number;
    updatingPointer: 'front' | 'rear' | null;
}

const PointerInfo: React.FC<PointerInfoProps> = ({ front, rear, updatingPointer }) => {
    const frontHighlight = updatingPointer === 'front' 
        ? 'scale-125 text-blue-500 dark:text-blue-300 shadow-blue-500/50' 
        : 'text-gray-500 dark:text-gray-400';
    const rearHighlight = updatingPointer === 'rear' 
        ? 'scale-125 text-orange-500 dark:text-orange-300 shadow-orange-500/50' 
        : 'text-gray-500 dark:text-gray-400';
    
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-sm p-3 rounded-lg border border-gray-300 dark:border-gray-700 font-mono shadow-xl z-10">
            <div className="flex items-center gap-6 text-lg">
                <div className={`flex items-center gap-2 transition-all duration-300 transform shadow-lg rounded-full px-3 py-1 ${frontHighlight}`}>
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300"></div>
                    <span className="font-bold">FRONT:</span>
                    <span className="w-8 text-center font-bold text-xl">{front}</span>
                </div>
                <div className={`flex items-center gap-2 transition-all duration-300 transform shadow-lg rounded-full px-3 py-1 ${rearHighlight}`}>
                    <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-300"></div>
                    <span className="font-bold">REAR:</span>
                    <span className="w-8 text-center font-bold text-xl">{rear}</span>
                </div>
            </div>
        </div>
    );
}

export default PointerInfo;
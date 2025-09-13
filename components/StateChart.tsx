import React, { useMemo } from 'react';

interface StateChartProps {
    maxSize: number;
}

const StateChart: React.FC<StateChartProps> = ({ maxSize }) => {
    const emptyCombinations = useMemo(() => {
        return Array.from({ length: maxSize }, (_, i) => ({
            rear: i,
            front: (i + 1) % maxSize,
        }));
    }, [maxSize]);

    const fullCombinations = useMemo(() => {
        return Array.from({ length: maxSize }, (_, i) => ({
            rear: i,
            front: (i + 2) % maxSize,
        }));
    }, [maxSize]);

    const Table: React.FC<{ title: string, data: { rear: number, front: number }[] }> = ({ title, data }) => (
        <div>
            <h3 className="text-teal-600 dark:text-teal-400 font-bold mb-2 text-center">{title}</h3>
            <div className="grid grid-cols-2 gap-x-4 text-center font-mono">
                <div className="font-semibold border-b border-gray-400 dark:border-gray-600">Rear</div>
                <div className="font-semibold border-b border-gray-400 dark:border-gray-600">Front</div>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="text-orange-600 dark:text-orange-300">{item.rear}</div>
                        <div className="text-blue-600 dark:text-blue-300">{item.front}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    return (
        <div className="absolute top-14 left-4 z-20 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-2xl max-h-[calc(100%-80px)] overflow-y-auto">
            <div className="flex gap-6">
                <Table title="Queue is Empty" data={emptyCombinations} />
                <Table title="Queue is Full" data={fullCombinations} />
            </div>
        </div>
    );
};

export default StateChart;
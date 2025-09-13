import React, { useRef, useEffect } from 'react';
import PointerInfo from './PointerInfo';

declare const anime: any;

interface PieVisualizerProps {
    data: (string | null)[];
    front: number;
    rear: number;
    maxSize: number;
    updatingPointer: 'front' | 'rear' | null;
}

const getCoordinatesForAngle = (angle: number, radius: number, cx: number, cy: number) => {
    return [
        cx + radius * Math.cos(angle),
        cy + radius * Math.sin(angle)
    ];
};

interface PieSliceProps {
    index: number;
    value: string | null;
    maxSize: number;
    radius: number;
    cx: number;
    cy: number;
}

const PieSlice: React.FC<PieSliceProps> = React.memo(({ index, value, maxSize, radius, cx, cy }) => {
    const sliceAngle = 2 * Math.PI / maxSize;
    const startAngle = index * sliceAngle - Math.PI / 2;
    const endAngle = (index + 1) * sliceAngle - Math.PI / 2;

    const [startX, startY] = getCoordinatesForAngle(startAngle, radius, cx, cy);
    const [endX, endY] = getCoordinatesForAngle(endAngle, radius, cx, cy);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    // Position for value inside the slice
    const valueAngle = (startAngle + endAngle) / 2;
    const valueRadius = radius * 0.7;
    const [valueX, valueY] = getCoordinatesForAngle(valueAngle, valueRadius, cx, cy);

    // Position for index outside the slice
    const indexAngle = (startAngle + endAngle) / 2;
    const indexRadius = radius + 15;
    const [indexX, indexY] = getCoordinatesForAngle(indexAngle, indexRadius, cx, cy);


    const isFilled = value !== null;
    const pathData = `M ${cx} ${cy} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    const pathClass = isFilled
        ? 'fill-teal-500/40 dark:fill-teal-600/50 stroke-gray-400 dark:stroke-gray-600'
        : 'fill-gray-300/80 dark:fill-gray-700/60 stroke-gray-400 dark:stroke-gray-600';

    return (
        <g>
            <path d={pathData} className={pathClass} strokeWidth="2" />
            <text x={valueX} y={valueY} dy=".3em" textAnchor="middle" className={`fill-gray-800 dark:fill-gray-200 font-bold text-xl transition-opacity duration-500 ${isFilled ? 'opacity-100' : 'opacity-0'}`}>
                {value}
            </text>
            <text x={indexX} y={indexY} dy=".3em" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 font-mono text-xs">
                {index}
            </text>
        </g>
    );
});

const PieVisualizer: React.FC<PieVisualizerProps> = ({ data, front, rear, maxSize, updatingPointer }) => {
    const size = 400;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 40;
    
    const frontMarkerRef = useRef<SVGGElement>(null);
    const rearMarkerRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const anglePerSlice = 360 / maxSize;
        const initialFrontAngle = front * anglePerSlice;
        const initialRearAngle = rear * anglePerSlice;

        anime.set(frontMarkerRef.current, { rotate: initialFrontAngle });
        anime.set(rearMarkerRef.current, { rotate: initialRearAngle });
    }, [maxSize, data]);


    useEffect(() => {
        const anglePerSlice = 360 / maxSize;
        anime({
            targets: frontMarkerRef.current,
            rotate: front * anglePerSlice,
            duration: 800,
            easing: 'easeInOutQuint'
        });
    }, [front, maxSize]);

    useEffect(() => {
        const anglePerSlice = 360 / maxSize;
        anime({
            targets: rearMarkerRef.current,
            rotate: rear * anglePerSlice,
            duration: 800,
            easing: 'easeInOutQuint'
        });
    }, [rear, maxSize]);

    const areOverlapping = front === rear;
    const frontXOffset = areOverlapping ? -12 : 0;
    const rearXOffset = areOverlapping ? 12 : 0;
    const markerY = cy - (radius + 22);

    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <PointerInfo front={front} rear={rear} updatingPointer={updatingPointer} />
            <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" style={{ maxWidth: '500px' }} className="overflow-visible">
                {data.map((value, index) => (
                    <PieSlice 
                        key={index} 
                        index={index} 
                        value={value} 
                        maxSize={maxSize} 
                        radius={radius} 
                        cx={cx} 
                        cy={cy}
                    />
                ))}
                <circle cx={cx} cy={cy} r={radius * 0.3} className="fill-white dark:fill-gray-800" />
                
                <g ref={frontMarkerRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
                    <text x={cx + frontXOffset} y={markerY} textAnchor="middle" dy=".3em" className="fill-blue-500 dark:fill-blue-400 text-3xl font-black tracking-tighter" style={{ filter: 'drop-shadow(0 0 5px rgb(59 130 246 / 0.8))' }}>F</text>
                </g>
                <g ref={rearMarkerRef} style={{ transformOrigin: `${cx}px ${cy}px` }}>
                     <text x={cx + rearXOffset} y={markerY} textAnchor="middle" dy=".3em" className="fill-orange-500 dark:fill-orange-400 text-3xl font-black tracking-tighter" style={{ filter: 'drop-shadow(0 0 5px rgb(251 146 60 / 0.8))' }}>R</text>
                </g>
            </svg>
        </div>
    );
};

export default PieVisualizer;
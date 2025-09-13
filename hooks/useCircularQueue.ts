import { useState, useCallback, useMemo } from 'react';
import { ENQUEUE_HIGHLIGHT_MAP, DEQUEUE_HIGHLIGHT_MAP } from '../constants';
import { ActionType } from '../types';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const useCircularQueue = (initialSize: number = 10, isFastMode: boolean = false) => {
    const [maxSize, setMaxSize] = useState(initialSize);
    const [data, setData] = useState<(string | null)[]>(Array(initialSize).fill(null));
    const [front, setFront] = useState(1);
    const [rear, setRear] = useState(0);
    const [feedback, setFeedback] = useState('Queue initialized.');
    const [isAnimating, setIsAnimating] = useState(false);
    const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
    const [activeAction, setActiveAction] = useState<ActionType>(ActionType.NONE);
    const [errorState, setErrorState] = useState<'full' | 'empty' | null>(null);
    const [updatingPointer, setUpdatingPointer] = useState<'front' | 'rear' | null>(null);
    const [defaultCharIndex, setDefaultCharIndex] = useState(0);

    const isEmpty = useMemo(() => front === (rear + 1) % maxSize, [front, rear, maxSize]);
    const isFull = useMemo(() => front === (rear + 2) % maxSize, [front, rear, maxSize]);

    const initializeQueue = useCallback((size: number) => {
        setMaxSize(size);
        setData(Array(size).fill(null));
        setFront(1);
        setRear(0);
        setDefaultCharIndex(0);
        setFeedback(`Queue initialized with size ${size}.`);
        setHighlightedLine(null);
        setActiveAction(ActionType.NONE);
    }, []);

    const setNewMaxSize = useCallback((newSizeStr: string) => {
        const newSize = parseInt(newSizeStr, 10);
        if (!isNaN(newSize) && newSize > 2 && newSize <= 10) {
            initializeQueue(newSize);
        } else {
            setFeedback('Invalid size. Please enter a number between 3 and 10.');
        }
    }, [initializeQueue]);

    const step = async (duration: number) => {
        if (!isFastMode) {
            await sleep(duration);
        }
    };

    const enqueue = useCallback(async (elem?: string) => {
        if (isAnimating) return;

        let elementToEnqueue = elem;
        if (!elementToEnqueue) {
            elementToEnqueue = String.fromCharCode(65 + defaultCharIndex);
            setDefaultCharIndex(prev => (prev + 1) % 26);
        }

        setIsAnimating(true);
        setActiveAction(ActionType.ENQUEUE);
        setFeedback('');
        setErrorState(null);
        await step(50);

        setHighlightedLine(ENQUEUE_HIGHLIGHT_MAP.checkFull);
        await step(isFastMode ? 200 : 800);

        if (isFull) {
            setHighlightedLine(ENQUEUE_HIGHLIGHT_MAP.isFull);
            setFeedback('Queue is full!');
            setErrorState('full');
            await step(isFastMode ? 300 : 1000);
        } else {
            const newRear = (rear + 1) % maxSize;
            setHighlightedLine(ENQUEUE_HIGHLIGHT_MAP.updateRear);
            setUpdatingPointer('rear');
            setRear(newRear);
            await step(isFastMode ? 200 : 900); 

            setHighlightedLine(ENQUEUE_HIGHLIGHT_MAP.setData);
            setData(currentData => {
                const newData = [...currentData];
                newData[newRear] = elementToEnqueue as string;
                return newData;
            });
            setFeedback(`Enqueued: ${elementToEnqueue}`);
            await step(isFastMode ? 200 : 900);
        }

        setHighlightedLine(null);
        setUpdatingPointer(null);
        setIsAnimating(false);
        setErrorState(null);
    }, [isAnimating, isFull, rear, maxSize, defaultCharIndex, isFastMode]);

    const dequeue = useCallback(async () => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setActiveAction(ActionType.DEQUEUE);
        setFeedback('');
        setErrorState(null);
        await step(50);

        setHighlightedLine(DEQUEUE_HIGHLIGHT_MAP.checkEmpty);
        await step(isFastMode ? 200 : 800);

        if (isEmpty) {
            setHighlightedLine(DEQUEUE_HIGHLIGHT_MAP.isEmpty);
            setFeedback('Queue is empty!');
            setErrorState('empty');
            await step(isFastMode ? 300 : 1000);
        } else {
            const dequeuedValue = data[front];
            setData(currentData => {
                const newData = [...currentData];
                newData[front] = null;
                return newData;
            });

            setHighlightedLine(DEQUEUE_HIGHLIGHT_MAP.updateFront);
            setUpdatingPointer('front');
            setFront(prev => (prev + 1) % maxSize);
            await step(isFastMode ? 200 : 900);
            
            setFeedback(`Dequeued: ${dequeuedValue}`);
            await step(isFastMode ? 200 : 900);
        }

        setHighlightedLine(null);
        setUpdatingPointer(null);
        setIsAnimating(false);
        setErrorState(null);
    }, [isAnimating, isEmpty, data, front, maxSize, isFastMode]);

    const state = {
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
    };

    return { state, setNewMaxSize, enqueue, dequeue };
};
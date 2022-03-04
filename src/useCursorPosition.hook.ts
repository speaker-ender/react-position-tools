import { useCallback, useEffect, useState } from "react";
import { useThrottle } from '@react-hook/throttle';

interface IPos {
    x: number;
    y: number
}

export const useCursorPosition = () => {
    const [cursorPosition, setCursorPosition] = useThrottle<IPos>({ x: 0, y: 0 }, 20);

    const updateCursor = useCallback((event: PointerEvent) => {
        setCursorPosition({ x: event.clientX, y: event.clientY });
    }, [cursorPosition]);

    useEffect(() => {
        window && window.addEventListener('pointermove', (event) => updateCursor(event));
        return () => {
            window && window.removeEventListener('pointermove', (event) => updateCursor(event as PointerEvent))
        }
    }, [])

    return cursorPosition;
}

export const useCursorPercent = () => {
    const { x, y } = useCursorPosition();
    const [cursorPercent, setCursorPercent] = useState<IPos>({ x: 0, y: 0 });

    const updateCursorPercent = useCallback((newPos: IPos) => {
        setCursorPercent(newPos);
    }, [cursorPercent, setCursorPercent]);

    useEffect(() => {
        window && updateCursorPercent({ x: Math.round((x / window.innerWidth) * 10000) / 100, y: Math.round((y / window.innerHeight) * 10000) / 100 });
    }, [setCursorPercent, x, y]);

    return cursorPercent;
}

export const useIsCursorActive = () => {
    const { x, y } = useCursorPosition();
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const updateCursor = useCallback((newIsActive: boolean) => {
        setIsActive(newIsActive);
    }, [isActive, setIsActive]);

    useEffect(() => {
        if (seconds > 3) {
            updateCursor(false);
        }
    }, [seconds]);

    useEffect(() => {
        updateCursor(true);
        setSeconds(0);
    }, [x, y, setSeconds]);

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            interval && clearInterval(interval);
        }
        return () => {
            interval && clearInterval(interval);
        }
    }, [isActive, seconds]);

    return isActive;
}

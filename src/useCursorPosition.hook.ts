import { useCallback, useEffect, useState } from "react";
import { useThrottle } from '@react-hook/throttle';
import { height, leftEdgeDistance, topEdgeDistance, width } from "@speaker-ender/js-measure";

interface IPos {
    x: number;
    y: number
}

export const useCursorPosition = () => {
    const [cursorPosition, setCursorPosition] = useThrottle<IPos>({ x: 0, y: 0 }, 20);
    const [relativeElement, setRelativeElement] = useState<HTMLElement>();

    const updateCursor = useCallback((event: PointerEvent) => {
        let xPosition = event.clientX;
        let yPosition = event.clientY;

        if (!!relativeElement) {
            const elementWidth = width(relativeElement)
            const top = topEdgeDistance(relativeElement, 'document');
            const left = leftEdgeDistance(relativeElement);
            const right = left + elementWidth;
            const bottom = top + height(relativeElement);
            xPosition = Math.min(Math.max(0, xPosition - left), right);
            yPosition = Math.min(Math.max(0, yPosition - top), bottom);
        }

        setCursorPosition({ x: xPosition, y: yPosition });
    }, [cursorPosition]);

    const updateRelativeElement = useCallback((element: HTMLElement) => {
        setRelativeElement(element);
    }, [setRelativeElement]);

    useEffect(() => {
        window && window.addEventListener('pointermove', (event) => updateCursor(event));
        return () => {
            window && window.removeEventListener('pointermove', (event) => updateCursor(event as PointerEvent))
        }
    }, [])

    return { ...cursorPosition, updateRelativeElement, relativeElement };
}

export const useCursorPercent = () => {
    const { x, y, updateRelativeElement, relativeElement } = useCursorPosition();
    const [cursorPercent, setCursorPercent] = useState<IPos>({ x: 0, y: 0 });

    const updateCursorPercent = useCallback((newPos: IPos) => {
        setCursorPercent(newPos);
    }, [cursorPercent, setCursorPercent]);

    useEffect(() => {
        if (!!relativeElement) {
            window && updateCursorPercent({
                x: Math.round((x / width(relativeElement)) * 10000) / 100,
                y: Math.round((y / height(relativeElement)) * 10000) / 100
            });
        } else {
            console.log('updating with window for some reason');
            window && updateCursorPercent({
                x: Math.round((x / window.innerWidth) * 10000) / 100,
                y: Math.round((y / window.innerHeight) * 10000) / 100
            });
        }
    }, [setCursorPercent, x, y]);

    return { ...cursorPercent, updateRelativeElement };
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

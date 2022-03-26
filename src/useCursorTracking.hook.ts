import { useCallback, useEffect, useRef, useState } from "react";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { IPos, useCursorContext } from "./cursor.context";
import { useElementTrackingState } from "./useElementTracking.hook";

export interface ICursorTrackingState {
    pixels: IPos,
    percent: IPos,
}

export const useCursorTracking = () => {
    const isClientSide = useClientHook();
    const { registerCursorCallback, unregisterCursorCallback, cursorPosition } = useCursorContext();
    const { refCallback, elementState } = useElementTrackingState();
    const currentCursorPosition = useRef(cursorPosition.currentPosition || { x: 0, y: 0 });
    const [relativeCursorPosition, setRelativeCursorPosition] = useState<ICursorTrackingState>({
        pixels: cursorPosition.currentPosition || { x: 0, y: 0 },
        percent: cursorPosition.currentPosition || { x: 0, y: 0 }
    });

    const getPercent = useCallback((newCursorPosition: IPos) => {
        return {
            x: Math.round((newCursorPosition.x / (elementState.width || 0)) * 10000) / 100,
            y: Math.round((newCursorPosition.y / (elementState.height || 0)) * 10000) / 100
        }
    }, [elementState && elementState.width, elementState && elementState.height])

    const updateCursor = useCallback(() => {
        let xPosition = currentCursorPosition.current ? currentCursorPosition.current.x : 0;
        let yPosition = currentCursorPosition.current ? currentCursorPosition.current.y : 0;

        if (!!elementState) {
            xPosition = Math.min(Math.max(0, xPosition - (elementState.left || 0)), (elementState.width || 0));
            yPosition = Math.min(Math.max(0, yPosition - (elementState.relativeTop || 0)), (elementState.height || 0));
        }

        const newPixels = { x: xPosition, y: yPosition };

        setRelativeCursorPosition({ pixels: newPixels, percent: getPercent(newPixels) });
    }, [currentCursorPosition.current && currentCursorPosition.current.x, elementState, getPercent, setRelativeCursorPosition]);


    const updateCurrentCursorPosition = useCallback((currentPosition?: IPos, previousPosition?: IPos) => {
        currentCursorPosition.current = currentPosition || { x: 0, y: 0 };
    }, []);

    useEffect(() => {
        !!elementState && updateCursor()

        return () => {
        }
    }, [currentCursorPosition.current, elementState]);

    useEffect(() => {
        if (!!isClientSide) {
            registerCursorCallback(updateCurrentCursorPosition);
        }

        return () => {
            unregisterCursorCallback(updateCurrentCursorPosition);
        }
    }, [isClientSide]);

    return { ...relativeCursorPosition, refCallback };
}

export const useIsCursorActive = () => {
    const { pixels } = useCursorTracking();
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
    }, [pixels, setSeconds]);

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

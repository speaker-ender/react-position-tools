import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThrottle } from '@react-hook/throttle';
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { IPos, useCursorContext, useCursorState } from "./cursor.context";
import { IElementState, useElementTracking } from "./useElementTracking.hook";
import { leftEdgeDistance } from "@speaker-ender/js-measure";

export interface ICursorTrackingState {
    pixels: IPos,
    percent: IPos,
}

export const useCursorTracking = () => {
    const isClientSide = useClientHook();
    const { registerCursorCallback, unregisterCursorCallback, cursorPosition } = useCursorContext();
    const { updateElementRef, registerTrackedElementCallback, unregisterTrackedElementCallback, elementState } = useElementTracking();
    const currentCursorPosition = useRef(cursorPosition.currentPosition || { x: 0, y: 0 });
    const [trackedElementState, setTrackedElementState] = useState(elementState);
    const [relativeCursorPosition, setRelativeCursorPosition] = useState<ICursorTrackingState>({
        pixels: cursorPosition.currentPosition || { x: 0, y: 0 },
        percent: cursorPosition.currentPosition || { x: 0, y: 0 }
    });

    const getPercent = useCallback((currentPos: IPos, currentElementState: typeof elementState) => {
        return {
            x: Math.round((currentPos.x / currentElementState.width) * 10000) / 100,
            y: Math.round((currentPos.y / currentElementState.height) * 10000) / 100
        }
    }, [])

    const updateCursor = useCallback(() => {
        let xPosition = currentCursorPosition.current ? currentCursorPosition.current.x : 0;
        let yPosition = currentCursorPosition.current ? currentCursorPosition.current.y : 0;

        if (!!elementState) {
            xPosition = Math.min(Math.max(0, xPosition - trackedElementState.left), trackedElementState.width);
            yPosition = Math.min(Math.max(0, yPosition - trackedElementState.relativeTop), trackedElementState.height);
        }

        const newPixels = { x: xPosition, y: yPosition };

        setRelativeCursorPosition({ pixels: newPixels, percent: getPercent(newPixels, elementState) });
    }, [currentCursorPosition.current && currentCursorPosition.current.x, trackedElementState]);

    const updateCurrentCursorPosition = useCallback((currentPosition?: IPos, previousPosition?: IPos) => {
        currentCursorPosition.current = currentPosition || { x: 0, y: 0 };
    }, []);

    const updateTrackedElementState = useCallback((newElementState: IElementState) => {
        setTrackedElementState(newElementState);
    }, [setTrackedElementState])

    const updateRelativeElement = useCallback((element: HTMLElement) => {
        updateElementRef(element);
        registerTrackedElementCallback(updateTrackedElementState)

        return () => {
            unregisterTrackedElementCallback(updateTrackedElementState);
        }
    }, [updateElementRef]);

    useEffect(() => {
        !!trackedElementState && updateCursor()

        return () => {
        }
    }, [currentCursorPosition.current, trackedElementState]);

    useEffect(() => {
        if (!!isClientSide) {
            registerCursorCallback(updateCurrentCursorPosition);
        }

        return () => {
            unregisterCursorCallback(updateCurrentCursorPosition);
        }
    }, [isClientSide]);

    return { ...relativeCursorPosition, updateRelativeElement };
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

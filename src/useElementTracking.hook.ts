import { useCallback, useEffect, useRef, useState } from 'react';
import { bottomEdgeDistance, height, leftEdgeDistance, topEdgeDistance, rightEdgeDistance, width } from '@speaker-ender/js-measure';
import { useThrottle } from '@react-hook/throttle';
import { IWindowDimensions, useWindowContext } from './window.context';
import { useScrollContext } from '@speaker-ender/react-scrollr';
import { useClientHook } from '@speaker-ender/react-ssr-tools';

export interface IElementState {
    top: number,
    left: number,
    bottom: number,
    right: number,
    relativeTop: number,
    relativeBottom: number,
    width: number,
    height: number,
}

export type TrackedElementCallback = (elementState: IElementState) => void;

export const useElementTracking = () => {
    const isClientSide = useClientHook();
    const { registerResizeCallback, unregisterResizeCallback, windowDimensions } = useWindowContext();
    const { registerScrollCallback, unregisterScrollCallback, scrollState } = useScrollContext();

    const [currentScrollState, setCurrentScrollState] = useState(scrollState.current);
    const [currentWindowState, setCurrentWindowState] = useState(windowDimensions.current);

    const [elementRef, setElementRef] = useState<HTMLElement>();
    const [elementState, setElementState] = useState<IElementState>(null!);

    const trackedElementCallbacks = useRef<TrackedElementCallback[]>([]);

    const registerTrackedElementCallback = useCallback(
        (trackedElementCallback: TrackedElementCallback) => {
            trackedElementCallbacks.current = ([...trackedElementCallbacks.current, trackedElementCallback]);
        },
        [trackedElementCallbacks.current]
    );

    const unregisterTrackedElementCallback = useCallback(
        (trackedElementCallback: TrackedElementCallback) => {
            trackedElementCallbacks.current = trackedElementCallbacks.current.filter(callback => callback !== trackedElementCallback);
        },
        [trackedElementCallbacks.current]
    );

    const getElementState = useCallback((getNewProp: Extract<keyof IElementState, string>[]) => {
        return !!elementRef && {
            top: getNewProp.includes('top') ? topEdgeDistance(elementRef, 'document') : elementState.top,
            left: getNewProp.includes('left') ? leftEdgeDistance(elementRef, 'viewport') : elementState.left,
            bottom: getNewProp.includes('bottom') ? bottomEdgeDistance(elementRef, 'document') : elementState.bottom,
            right: getNewProp.includes('right') ? rightEdgeDistance(elementRef, 'document') : elementState.right,
            relativeTop: getNewProp.includes('relativeTop') ? topEdgeDistance(elementRef, 'viewport') : elementState.relativeTop,
            relativeBottom: getNewProp.includes('relativeBottom') ? bottomEdgeDistance(elementRef, 'viewport') : elementState.relativeBottom,
            width: getNewProp.includes('width') ? width(elementRef) : elementState.width,
            height: getNewProp.includes('height') ? height(elementRef) : elementState.height,

        }
    }, [elementRef, elementState]);

    const updateElementState = useCallback((getNewProp: Extract<keyof IElementState, string>[]) => {
        const newElementState = getElementState(getNewProp);
        if (newElementState) {
            trackedElementCallbacks.current.map(trackedElementCallback =>
                trackedElementCallback(
                    newElementState
                )
            );
            newElementState && setElementState(newElementState);
        }
    }, [setElementState, elementRef, getElementState]);

    const updateElementRef = useCallback((element: HTMLElement) => {
        setElementRef(element);
    }, [setElementRef]);

    // Updating relevant measurements when window is resized
    useEffect(() => {
        updateElementState(['width', 'height', 'top', 'left', 'bottom', 'right', 'relativeBottom', 'relativeTop']);
    }, [currentWindowState && currentWindowState.width, currentWindowState && currentWindowState.height]);

    // Updating relevant measurements when scrolling
    useEffect(() => {
        updateElementState(['relativeTop', 'relativeBottom']);
    }, [currentScrollState && currentScrollState.currentPosition]);

    const updateScrollState = useCallback((newCurrentScroll?: number, newPreviousScroll?: number) => {
        if (!!newCurrentScroll) {
            setCurrentScrollState({
                currentPosition: newCurrentScroll,
                prevPosition: newPreviousScroll
            })
        }
    }, [setCurrentScrollState]);

    const updateWindowState = useCallback((newHeight: number, newWidth: number) => {
        setCurrentWindowState({
            width: newHeight,
            height: newWidth
        });
    }, [setCurrentWindowState]);

    useEffect(() => {
        registerScrollCallback(updateScrollState);
        registerResizeCallback(updateWindowState);
        updateElementState(['top', 'bottom', 'height', 'left', "relativeBottom", 'relativeTop', 'right', 'width']);


        return () => {
            unregisterScrollCallback(updateScrollState);
            unregisterResizeCallback(updateWindowState);
        };
    }, [isClientSide]);

    return { elementState, updateElementState, updateElementRef, elementRef, registerTrackedElementCallback, unregisterTrackedElementCallback };
}
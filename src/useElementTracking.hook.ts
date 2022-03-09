import { useCallback, useEffect, useRef, useState } from 'react';
import { bottomEdgeDistance, height, leftEdgeDistance, topEdgeDistance, rightEdgeDistance, width } from '@speaker-ender/js-measure';
import { useThrottle } from '@react-hook/throttle';
import { IWindowDimensions, useWindowContext } from './window.context';
import { useScrollContext } from '@speaker-ender/react-scrollr';
import { useClientHook } from '@speaker-ender/react-ssr-tools';

interface IElementState {
    top: number,
    left: number,
    bottom: number,
    right: number,
    relativeTop: number,
    relativeBottom: number,
    width: number,
    height: number,
}

export const useElementTracking = () => {
    const isClientSide = useClientHook();
    const { registerResizeCallback, unregisterResizeCallback, windowDimensions } = useWindowContext();
    const { registerScrollCallback, unregisterScrollCallback, scrollState } = useScrollContext();

    const [currentScrollState, setCurrentScrollState] = useState(scrollState.current);
    const [currentWindowState, setCurrentWindowState] = useState(windowDimensions.current);

    const [elementRef, setElementRef] = useState<HTMLElement>();
    const [elementState, setElementState] = useState<IElementState>(null!);


    const updateElementState = useCallback((getNewProp: Extract<keyof IElementState, string>[]) => {
        if (!!elementRef) {
            setElementState({
                top: getNewProp.includes('top') ? topEdgeDistance(elementRef, 'document') : elementState.top,
                left: getNewProp.includes('left') ? leftEdgeDistance(elementRef, 'document') : elementState.left,
                bottom: getNewProp.includes('bottom') ? bottomEdgeDistance(elementRef, 'document') : elementState.bottom,
                right: getNewProp.includes('right') ? rightEdgeDistance(elementRef, 'document') : elementState.right,
                relativeTop: getNewProp.includes('relativeTop') ? topEdgeDistance(elementRef, 'viewport') : elementState.relativeTop,
                relativeBottom: getNewProp.includes('relativeBottom') ? bottomEdgeDistance(elementRef, 'viewport') : elementState.relativeBottom,
                width: getNewProp.includes('width') ? width(elementRef) : elementState.width,
                height: getNewProp.includes('height') ? height(elementRef) : elementState.height,

            });
        }
    }, [setElementState, elementRef, elementState]);

    const updateElementRef = useCallback((element: HTMLElement) => {
        setElementRef(element);
    }, [setElementRef]);

    // Updating relevant measurements when window is resized
    // Want to change: top, left, bottom, right
    useEffect(() => {
        updateElementState(['width', 'height', 'top', 'left', 'bottom', 'right']);
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

    return { elementState, updateElementState, updateElementRef };
}
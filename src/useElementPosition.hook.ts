import { useCallback, useEffect, useRef, useState } from 'react';
import { bottomEdgeDistance, height, leftEdgeDistance, topEdgeDistance, rightEdgeDistance, width } from '@speaker-ender/js-measure';
import { useThrottle } from '@react-hook/throttle';
import { useWindowContext } from './window.context';
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
    const { windowDimensions } = useWindowContext();
    const { registerScrollCallback, scrollState } = useScrollContext();
    const [currentScrollState, setCurrentScrollState] = useState(scrollState.current);
    const [elementRef, setElementRef] = useState<HTMLElement>();
    const [elementState, setElementState] = useThrottle<IElementState>(null!);

    const updateElementState = useCallback((prevElementPosition: Partial<IElementState>) => {
        !!elementRef && setElementState({
            top: prevElementPosition.top || topEdgeDistance(elementRef),
            left: prevElementPosition.left || leftEdgeDistance(elementRef),
            bottom: prevElementPosition.bottom || bottomEdgeDistance(elementRef),
            right: prevElementPosition.right || rightEdgeDistance(elementRef),
            relativeTop: prevElementPosition.relativeTop || topEdgeDistance(elementRef, 'document'),
            relativeBottom: prevElementPosition.relativeBottom || bottomEdgeDistance(elementRef, 'document'),
            width: prevElementPosition.width || width(elementRef),
            height: prevElementPosition.height || height(elementRef),
        });
    }, [setElementState, elementRef]);

    const updateElementRef = useCallback((element: HTMLElement) => {
        setElementRef(element);
    }, [setElementRef]);

    useEffect(() => {
        const recycledProps: Partial<IElementState> = elementState ? {
            relativeTop: elementState.relativeTop,
            relativeBottom: elementState.relativeBottom,
            height: elementState.height,
            width: elementState.width,
        } : {}

        updateElementState(recycledProps);

        return () => {
        }
    }, [windowDimensions]);

    useEffect(() => {
        const recycledProps: Partial<IElementState> = elementState ? {
            top: elementState.top,
            right: elementState.right,
            bottom: elementState.bottom,
            left: elementState.left,
        } : {};

        updateElementState(recycledProps);
    }, [currentScrollState && currentScrollState.currentPosition]);

    const updateScrollState = useCallback((newCurrentScroll?: number, newPreviousScroll?: number) => {
        if (!!newCurrentScroll) {
            setCurrentScrollState({
                currentPosition: newCurrentScroll,
                prevPosition: newPreviousScroll
            })
        }
    }, [setCurrentScrollState]);

    useEffect(() => {
        registerScrollCallback(updateScrollState);

    }, [isClientSide]);

    return { elementState, updateElementState, updateElementRef };
}
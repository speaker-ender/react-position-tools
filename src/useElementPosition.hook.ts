import { useCallback, useEffect, useState } from 'react';
import { bottomEdgeDistance, height, leftEdgeDistance, topEdgeDistance, rightEdgeDistance, width } from '@speaker-ender/js-measure';
import { useThrottle } from '@react-hook/throttle';
import { useWindowContext } from './window.context';

interface IElementPosition {
    top: number,
    relativeTop: number,
    left: number,
    bottom: number,
    relativeBottom: number,
    right: number,
    width: number,
    height: number,
}

export const useElementPosition = () => {
    const { windowDimensions } = useWindowContext();
    const [elementPosition, setElementPosition] = useThrottle<IElementPosition>(null!);
    const [elementRef, setElementRef] = useState<HTMLElement>();

    const updateElementPosition = useCallback(() => {

        !!elementRef && setElementPosition({
            top: topEdgeDistance(elementRef),
            relativeTop: topEdgeDistance(elementRef, 'document'),
            left: leftEdgeDistance(elementRef),
            bottom: bottomEdgeDistance(elementRef),
            relativeBottom: bottomEdgeDistance(elementRef, 'document'),
            right: rightEdgeDistance(elementRef),
            width: width(elementRef),
            height: height(elementRef),
        });
    }, [elementPosition, setElementPosition, elementRef]);

    const updateElementRef = useCallback((element: HTMLElement) => {
        setElementRef(element);
    }, [setElementRef]);

    useEffect(() => {
        updateElementPosition();

        return () => {
        }
    }, [windowDimensions, elementRef])

    return { elementPosition, updateElementPosition, updateElementRef };
}
import { useCallback, useEffect } from 'react';
import { bottomPosition, height, leftPosition, relativeBottomPosition, relativeTopPosition, rightPosition, topPosition, width } from '@speaker-ender/js-position-helpers';
import { useThrottle } from '@react-hook/throttle';

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
    const [elementPosition, setElementPosition] = useThrottle<IElementPosition>(null!);

    const updateElementPosition = useCallback((element: Element) => {
        setElementPosition({
            top: topPosition(element),
            relativeTop: relativeTopPosition(element),
            left: leftPosition(element),
            bottom: bottomPosition(element),
            relativeBottom: relativeBottomPosition(element),
            right: rightPosition(element),
            width: width(element),
            height: height(element),
        });
    }, [elementPosition, setElementPosition]);

    useEffect(() => {

        return () => {
        }
    }, [])

    return { elementPosition, updateElementPosition };
}
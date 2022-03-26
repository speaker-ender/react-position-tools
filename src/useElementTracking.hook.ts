import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { bottomEdgeDistance, height, leftEdgeDistance, topEdgeDistance, rightEdgeDistance, width, rawWidth, rawHeight } from '@speaker-ender/js-measure';
import { useWindowContext } from './window.context';
import { useScrollContext } from '@speaker-ender/react-scrollr';
import { useClientHook } from '@speaker-ender/react-ssr-tools';
import { throttle } from 'throttle-debounce';

const UPDATE_INTERVAL = 10;
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

export interface IElementTrackingOptions {
    trackedProperties?: keyof IElementState,
    updateInterval?: number;
}

export type TrackedElementCallback = (elementState: Partial<IElementState>) => void;

export const useElementTrackingState = () => {
    const { useElementTrackingCallback, refCallback } = useElementTracking();
    const [elementState, setElementState] = useState<Partial<IElementState>>({});

    const updateElementState = useCallback((newElementState: Partial<IElementState>) => {
        setElementState({ ...elementState, ...newElementState });
    }, [elementState, setElementState])

    useEffect(() => {
        useElementTrackingCallback(updateElementState)
    }, [updateElementState]);

    return {
        elementState,
        refCallback
    };
}

export const useElementTracking = (
    props?: {
        trackedProperties?: keyof IElementState,
        updateInterval?: number
    }
) => {
    const interval = props?.updateInterval || UPDATE_INTERVAL;

    const isClientSide = useClientHook();
    const { registerResizeCallback, unregisterResizeCallback } = useWindowContext();
    const { registerScrollCallback, unregisterScrollCallback } = useScrollContext();

    const [elementRef, setElementRef] = useState<HTMLElement>(null!);
    const elementState = useRef<Partial<IElementState>>({});
    const elementTrackingCallback = useRef<TrackedElementCallback>(null!);

    const useElementTrackingCallback = useCallback((newCallback: TrackedElementCallback) => {
        elementTrackingCallback.current = newCallback;
    }, []);

    const getElementProps = useCallback((getNewProp: Extract<keyof IElementState, string>[]) => {
        return getNewProp.reduce((propObj, nextPropName) => {
            let newValue = 0;
            switch (nextPropName) {
                case 'top':
                    newValue = topEdgeDistance(elementRef, 'document')
                    break;
                case 'left':
                    newValue = leftEdgeDistance(elementRef, 'viewport')
                    break;
                case 'bottom':
                    newValue = bottomEdgeDistance(elementRef, 'document')
                    break;
                case 'right':
                    newValue = rightEdgeDistance(elementRef, 'viewport')
                    break;
                case 'relativeTop':
                    newValue = topEdgeDistance(elementRef, 'viewport')
                    break;
                case 'relativeBottom':
                    newValue = bottomEdgeDistance(elementRef, 'viewport')
                    break;
                case 'width':
                    newValue = rawWidth(elementRef)
                    break;
                case 'height':
                    newValue = rawHeight(elementRef)
                    break;
            }
            propObj[nextPropName] = newValue;
            return propObj
        }, {} as Partial<IElementState>)
    }, [elementRef, elementState]);


    const refCallback = useCallback((element: HTMLElement) => {
        element && setElementRef(element);
    }, []);

    const throttledUpdateCallback = throttle(interval, (getNewProp: Extract<keyof IElementState, string>[]) => elementTrackingCallback.current && elementTrackingCallback.current(getElementProps(getNewProp)));

    const scrollStateCallback = useCallback((newCurrentScroll?: number, newPreviousScroll?: number) => {
        if (!!newCurrentScroll) {
            throttledUpdateCallback(['relativeTop', 'relativeBottom']);
        }
    }, [throttledUpdateCallback]);

    const windowStateCallback = useCallback((newHeight: number, newWidth: number) => {
        throttledUpdateCallback(['width', 'height', 'top', 'left', 'bottom', 'right', 'relativeBottom', 'relativeTop']);
    }, [throttledUpdateCallback]);

    useEffect(() => {
        elementRef && throttledUpdateCallback(['top', 'bottom', 'height', 'left', "relativeBottom", 'relativeTop', 'right', 'width']);
    }, [elementRef]);

    useEffect(() => {
        if (!!isClientSide) {
            registerScrollCallback(scrollStateCallback);
            registerResizeCallback(windowStateCallback);
        }

        return () => {
            unregisterScrollCallback(scrollStateCallback);
            unregisterResizeCallback(windowStateCallback);
        };
    }, [isClientSide]);

    return {
        elementState,
        useElementTrackingCallback,
        refCallback,
    };
}
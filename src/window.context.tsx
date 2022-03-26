import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { windowWidth, windowHeight } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook, useEventCallback } from '@speaker-ender/react-ssr-tools';
import { useRegisteredCallbacks, useThrottledEventCallback } from './helpers/hooks';

const LISTENER_INTERVAL = 10;

export type IWindowOptions = {
    resizeUpdateStateInterval: number;
    resizeCallbackInterval: number;
}

export type IWindowState = ReturnType<typeof useWindowState>;

export const WindowContext = createContext<IWindowState>(null!);

export interface IWindowContextProvider extends Partial<IWindowOptions> { }

export interface IWindowDimensions {
    width: number,
    height: number,
}

const selectWindowDimensions = (): IWindowDimensions => {
    return {
        height: windowHeight(),
        width: windowWidth()
    };
};

export type ResizeCallback = (height: number, width: number) => void;

export const useWindowState = ({ resizeUpdateStateInterval, resizeCallbackInterval }: IWindowOptions) => {
    const isClientSide = useClientHook();
    const $html = React.useRef<HTMLElement | null>(null);
    const windowDimensions = useRef<IWindowDimensions>(selectWindowDimensions());
    const [registerResizeCallback, unregisterResizeCallback, resizeCallbacks] = useRegisteredCallbacks<ResizeCallback>([])

    const throttledSetWindowDimensions = throttle(resizeUpdateStateInterval, (newWindowDimensions) => windowDimensions.current = newWindowDimensions);

    const handleResizeEvent = useCallback(() => {
        const newWindowDimensions = selectWindowDimensions();

        resizeCallbacks.current.map(resizeCallback =>
            resizeCallback(
                !!newWindowDimensions ? newWindowDimensions.height : 0,
                !!newWindowDimensions ? newWindowDimensions.width : 0
            )
        );

        throttledSetWindowDimensions(newWindowDimensions);
    }, [windowDimensions.current, resizeCallbacks]);

    useThrottledEventCallback('resize', resizeCallbackInterval, handleResizeEvent);

    useEffect(() => {
        $html.current = document.documentElement;
    }, [isClientSide]);

    return {
        $html,
        windowDimensions,
        registerResizeCallback,
        unregisterResizeCallback
    };
};

export const useWindowContext = () => {
    const windowContext = React.useContext(WindowContext);

    if (!windowContext) {
        throw new Error(
            'WindowContext used outside of WindowContext.Provider'
        );
    }

    return windowContext;
};

export const WindowContextProvider: React.FC<IWindowContextProvider> = (props) => {
    const windowState = useWindowState({ resizeUpdateStateInterval: LISTENER_INTERVAL, resizeCallbackInterval: LISTENER_INTERVAL, ...props });


    return (
        <WindowContext.Provider value={windowState}>
            {props.children}
        </WindowContext.Provider>
    );
};


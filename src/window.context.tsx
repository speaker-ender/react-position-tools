import React, { createContext, useCallback, useEffect, useRef } from 'react';
import { windowWidth, windowHeight } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook } from '@speaker-ender/react-ssr-tools';
import { useRegisteredCallbacks, useThrottledEventCallback } from './helpers/hooks';

const LISTENER_INTERVAL = 10;

export type IWindowOptions = {
    stateInterval: number;
    listenerInterval: number;
}

export type IWindowState = Partial<ReturnType<typeof useWindowState>>;

export const WindowContext = createContext<IWindowState | null>(null);

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

export const useWindowState = ({ stateInterval, listenerInterval }: IWindowOptions) => {
    const isClientSide = useClientHook();
    const $html = React.useRef<HTMLElement | null>(null);
    const windowDimensions = useRef<IWindowDimensions>(selectWindowDimensions());
    const [registerResizeCallback, unregisterResizeCallback, resizeCallbacks] = useRegisteredCallbacks<ResizeCallback>([])

    const throttledSetWindowDimensions = throttle(stateInterval, (newWindowDimensions) => windowDimensions.current = newWindowDimensions);

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

    useThrottledEventCallback('resize', listenerInterval, handleResizeEvent);

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
    console.log('window context provider should be here');
    const windowState = useWindowState({ stateInterval: LISTENER_INTERVAL, listenerInterval: LISTENER_INTERVAL, ...props });


    return (
        <WindowContext.Provider value={windowState}>
            {props.children}
        </WindowContext.Provider>
    );
};


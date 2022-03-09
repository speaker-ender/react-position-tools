import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { hasWindow, hasDocument, windowWidth, windowHeight } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useClientHook, useEventCallback } from '@speaker-ender/react-ssr-tools';

const LISTENER_INTERVAL = 10;

export type IWindowState = ReturnType<typeof useWindowState>;

export const WindowContext = createContext<IWindowState>(null!);

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

export const useWindowState = () => {
    const isClientSide = useClientHook();
    const $html = React.useRef<HTMLElement | null>(null);
    const windowDimensions = useRef<IWindowDimensions>(selectWindowDimensions());
    const resizeTimer = useRef<ReturnType<typeof setTimeout>>(null!);
    const resizeCallbacks = useRef<ResizeCallback[]>([]);

    const registerResizeCallback = useCallback(
        (resizeCallback: ResizeCallback) => {
            resizeCallbacks.current = ([...resizeCallbacks.current, resizeCallback]);
        },
        [resizeCallbacks.current]
    );

    const unregisterResizeCallback = useCallback(
        (resizeCallback: ResizeCallback) => {
            resizeCallbacks.current = resizeCallbacks.current.filter(callback => callback !== resizeCallback);
        },
        [resizeCallbacks.current]
    );

    const throttledSetWindowDimensions = throttle(LISTENER_INTERVAL, (newWindowDimensions) => windowDimensions.current = newWindowDimensions);

    const handleResizeEvent = useEventCallback(() => {
        const newWindowDimensions = selectWindowDimensions();

        resizeCallbacks.current.map(resizeCallback =>
            resizeCallback(
                !!newWindowDimensions ? newWindowDimensions.height : 0,
                !!newWindowDimensions ? newWindowDimensions.width : 0
            )
        );

        throttledSetWindowDimensions(newWindowDimensions);
    }, [!!windowDimensions.current && windowDimensions.current.width, !!windowDimensions.current && windowDimensions.current.height, resizeCallbacks]);

    const listenToResize = useCallback(() => {
        clearTimeout(resizeTimer.current);
        resizeTimer.current = setTimeout(
            () =>
                requestAnimationFrame(() => {
                    handleResizeEvent();
                }),
            LISTENER_INTERVAL
        );
    }, [resizeTimer, handleResizeEvent, resizeCallbacks]);

    useEffect(() => {
        $html.current = document.documentElement;
        const updateResizeActive = () => {
            listenToResize();
        }

        if (!!isClientSide) {
            handleResizeEvent();
            window.addEventListener('resize', updateResizeActive);
        }

        return () => {
            window.removeEventListener('resize', updateResizeActive);
        };
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
            'NavMeta Context used outside of NavMetaContext.Provider'
        );
    }

    return windowContext;
};

export const WindowContextProvider: React.FC = (props) => {
    const windowState = useWindowState();

    return (
        <WindowContext.Provider value={windowState}>
            {props.children}
        </WindowContext.Provider>
    );
};


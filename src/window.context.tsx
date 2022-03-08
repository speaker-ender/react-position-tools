import React, { createContext, useCallback, useEffect, useState } from 'react';
import { hasWindow, hasDocument, windowWidth, windowHeight } from '@speaker-ender/js-measure';
import { throttle } from 'throttle-debounce';
import { useEventCallback } from '@speaker-ender/react-ssr-tools';

const LISTENER_INTERVAL = 100;

export type IWindowState = Partial<ReturnType<typeof useWindowState>>;

export const WindowContext = createContext<IWindowState | null>(
    null
);

export interface IWindowDimensions {
    width: number,
    height: number,
}

const selectWindowDimensions = (): IWindowDimensions | undefined =>
    hasWindow
        ? {
            width: windowWidth(),
            height: windowHeight(),
        }
        : undefined;

export type ResizeCallback = (windowDimensions?: IWindowDimensions) => void;

export const useWindowState = () => {
    const $html = React.useRef<HTMLElement | null>(null);
    const [windowDimensions, setWindowDimensions] = useState(selectWindowDimensions);
    const [resizeCallbacks, setResizeCallbacks] = useState<
        ResizeCallback[]
    >([]);

    useEffect(() => {
        if (hasDocument) {
            $html.current = document.documentElement;
        }
    }, []);

    const registerResizeCallback = useCallback(
        (resizeCallback: ResizeCallback) => {
            setResizeCallbacks([...resizeCallbacks, resizeCallback]);
        },
        [resizeCallbacks]
    );

    const unregisterScrollCallback = useCallback(
        (resizeCallback: ResizeCallback) => {
            setResizeCallbacks(
                resizeCallbacks.filter(callback => callback !== resizeCallback)
            );
        },
        [resizeCallbacks]
    );

    const throttledSetWindowDimensions = throttle(LISTENER_INTERVAL, setWindowDimensions);

    const handleResizeEvent = useEventCallback(() => {
        const newWindowDimensions = selectWindowDimensions();

        resizeCallbacks.map(resizeCallback =>
            resizeCallback(
                newWindowDimensions && newWindowDimensions
            )
        );

        throttledSetWindowDimensions(newWindowDimensions);
    }, [windowDimensions && windowDimensions.width, windowDimensions && windowDimensions.height, resizeCallbacks]);

    useEffect(() => {
        window.addEventListener('resize', handleResizeEvent);

        return () => {
            window.removeEventListener('resize', handleResizeEvent);
        };
    }, [handleResizeEvent]);

    return {
        $html,
        windowDimensions,
        registerResizeCallback,
        unregisterScrollCallback
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


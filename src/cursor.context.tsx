import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useClientHook } from '@speaker-ender/react-ssr-tools';
import { useThrottle } from '@react-hook/throttle';
import { throttle } from 'throttle-debounce';
import { useRegisteredCallbacks, useThrottledEventCallback } from './helpers/hooks';

const LISTENER_INTERVAL = 10;

export type ICursorState = ReturnType<typeof useCursorState>;

export const CursorContext = createContext<ICursorState>(
    null!
);

export interface IPos {
    x: number;
    y: number
}

export interface ICursorPositionState {
    currentPosition?: IPos,
    previousPosition?: IPos
}

export type CursorCallback = (currentPosition?: IPos, previousPosition?: IPos) => void;

export const useCursorState = () => {
    const [cursorPosition, setCursorPosition] = useThrottle<ICursorPositionState>({ currentPosition: { x: 0, y: 0 } }, LISTENER_INTERVAL);
    const [registerCursorCallback, unregisterCursorCallback, cursorCallbacks] = useRegisteredCallbacks<CursorCallback>([])

    const handleCursorEvent = useCallback((event?: PointerEvent) => {
        if (event) {
            const newCursorState = { x: event.clientX, y: event.clientY };

            cursorCallbacks.current.map(cursorCallback =>
                cursorCallback(
                    newCursorState,
                    cursorPosition.currentPosition,
                )
            );

            setCursorPosition({
                currentPosition: newCursorState,
                previousPosition: cursorPosition.previousPosition
            });
        }
    }, [cursorPosition.currentPosition, setCursorPosition, cursorCallbacks.current]);

    useThrottledEventCallback('pointermove', LISTENER_INTERVAL, handleCursorEvent);

    return {
        cursorPosition,
        registerCursorCallback,
        unregisterCursorCallback,
    };
};

export const useCursorContext = () => {
    const cursorContext = React.useContext(CursorContext);

    if (!cursorContext) {
        throw new Error(
            'NavMeta Context used outside of NavMetaContext.Provider'
        );
    }

    return cursorContext;
};

export const CursorContextProvider: React.FC = (props) => {
    const cursorState = useCursorState();

    return (
        <CursorContext.Provider value={cursorState}>
            {props.children}
        </CursorContext.Provider>
    );
};


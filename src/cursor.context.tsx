import React, { createContext, ReactNode, useCallback, useState } from "react";
import {
  useRegisteredCallbacks,
  useThrottledEventCallback,
} from "./helpers/hooks";
import { throttle } from "throttle-debounce";

const CURSOR_INTERVAL = 10;

export type ICursorOptions = {
  listenerInterval: number;
  stateInterval: number;
};

export type ICursorState = ReturnType<typeof useCursorState>;

export const CursorContext = createContext<ICursorState>(null!);

export interface IPos {
  x: number;
  y: number;
}

export interface ICursorPositionState {
  currentPosition?: IPos;
  previousPosition?: IPos;
}

export interface IScrollContextProvider extends Partial<ICursorOptions> {
  children?: ReactNode;
}

export type CursorCallback = (
  currentPosition?: IPos,
  previousPosition?: IPos
) => void;

export const useCursorState = ({
  listenerInterval,
  stateInterval,
}: ICursorOptions) => {
  const [cursorPosition, setCursorPosition] = useState<ICursorPositionState>({
    currentPosition: { x: 0, y: 0 },
  });
  const [registerCursorCallback, unregisterCursorCallback, cursorCallbacks] =
    useRegisteredCallbacks<CursorCallback>([]);

  const throttledSetCursorPosition = throttle(stateInterval, setCursorPosition);

  const handleCursorEvent = useCallback(
    (event?: PointerEvent) => {
      if (event) {
        const newCursorState = { x: event.clientX, y: event.clientY };

        cursorCallbacks.current.map((cursorCallback) =>
          cursorCallback(newCursorState, cursorPosition.currentPosition)
        );

        throttledSetCursorPosition({
          currentPosition: newCursorState,
          previousPosition: cursorPosition.previousPosition,
        });
      }
    },
    [
      cursorPosition.currentPosition,
      throttledSetCursorPosition,
      cursorCallbacks.current,
    ]
  );

  useThrottledEventCallback("pointermove", listenerInterval, handleCursorEvent);

  return {
    cursorPosition,
    registerCursorCallback,
    unregisterCursorCallback,
  };
};

export const useCursorContext = () => {
  const cursorContext = React.useContext(CursorContext);

  if (!cursorContext) {
    throw new Error("Cursor Context used outside of CursorContext.Provider");
  }

  return cursorContext;
};

export const CursorContextProvider: React.FC<IScrollContextProvider> = (
  props
) => {
  const cursorState = useCursorState({
    listenerInterval: CURSOR_INTERVAL,
    stateInterval: CURSOR_INTERVAL,
    ...props,
  });

  return (
    <CursorContext.Provider value={cursorState}>
      {props.children}
    </CursorContext.Provider>
  );
};

import { useClientHook } from "@speaker-ender/react-ssr-tools";
import React, {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { throttle } from "throttle-debounce";
import { useRegisteredCallbacks } from "./helpers/hooks";

export const useThrottledEventCallback = (
  eventName: string,
  interval: number,
  fn: (e?: any) => void
) => {
  const isClientSide = useClientHook();

  const throttledEvent = throttle(interval, fn);

  useEffect(() => {
    !!isClientSide && window.addEventListener(eventName, throttledEvent);

    return () => {
      window.removeEventListener(eventName, throttledEvent);
    };
  }, [isClientSide]);

  return [];
};

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

export interface ICursorContextProvider extends Partial<ICursorOptions> {
  children?: ReactNode;
}

export type CursorCallback = (
  currentPosition?: IPos,
  previousPosition?: IPos
) => void;

export const useCursorState = ({
  listenerInterval,
  stateInterval,
}: ICursorOptions): [
  cursorPosition: MutableRefObject<ICursorPositionState>,
  registerCursorCallback: (callback: CursorCallback) => void,
  unregisterCursorCallback: (callback: CursorCallback) => void
] => {
  const cursorPosition = useRef<ICursorPositionState>({
    currentPosition: { x: 0, y: 0 },
  });
  const [registerCursorCallback, unregisterCursorCallback, cursorCallbacks] =
    useRegisteredCallbacks<CursorCallback>([]);

  const throttledSetCursorPosition = throttle(
    stateInterval,
    (newCursorPosition) => (cursorPosition.current = newCursorPosition)
  );

  const handleCursorEvent = useCallback(
    (event?: PointerEvent) => {
      if (event) {
        const newCursorState = { x: event.clientX, y: event.clientY };

        if (newCursorState !== cursorPosition.current.currentPosition) {
          cursorCallbacks.current.map((cursorCallback) =>
            cursorCallback(
              newCursorState,
              cursorPosition.current.currentPosition
            )
          );

          throttledSetCursorPosition({
            currentPosition: newCursorState,
            previousPosition: cursorPosition.current.currentPosition,
          });
        }
      }
    },
    [
      cursorPosition.current.currentPosition,
      throttledSetCursorPosition,
      cursorCallbacks.current,
    ]
  );

  useThrottledEventCallback("pointermove", listenerInterval, handleCursorEvent);

  return [cursorPosition, registerCursorCallback, unregisterCursorCallback];
};

export const useCursorContext = () => {
  const cursorContext = React.useContext(CursorContext);

  if (!cursorContext) {
    throw new Error("Cursor Context used outside of CursorContext.Provider");
  }

  return cursorContext;
};

export const CursorContextProvider: React.FC<ICursorContextProvider> = (
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

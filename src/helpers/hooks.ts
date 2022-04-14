import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { throttle } from "throttle-debounce";

export const useRegisteredCallbacks = <T extends (...args: any[]) => any>(
  initialValue: any
): [(callback: T) => void, (callback: T) => void, MutableRefObject<T[]>] => {
  const callbacks = useRef<T[]>(initialValue);

  const registerCallback = useCallback(
    (callback: T) => {
      callbacks.current = [...callbacks.current, callback];
    },
    [callbacks.current]
  );

  const unregisterCallback = useCallback(
    (callbackToRemove: T) => {
      callbacks.current = callbacks.current.filter(
        (callback) => callback !== callbackToRemove
      );
    },
    [callbacks.current]
  );

  return [registerCallback, unregisterCallback, callbacks];
};

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

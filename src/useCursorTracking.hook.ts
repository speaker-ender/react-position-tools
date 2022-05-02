import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import {
  useClientHook,
  useEventCallback,
} from "@speaker-ender/react-ssr-tools";
import { IPos } from "@speaker-ender/react-position-tools/dist/cursor.context";
import { useCursorContext } from "./cursor.context";
import {
  IElementState,
  useElementTracking,
} from "./useElementTracking.hook";
import { useRegisteredCallbacks } from "./helpers/hooks";

export interface ICursorTrackingState {
  pixels: IPos;
  percent: IPos;
}

export type CursorTrackingCallback = (
  cursorState: ICursorTrackingState
) => void;

export const useCursorTracking = (): [
  registerCursorCallback: (callback: CursorTrackingCallback) => void,
  unregisterCursorCallback: (callback: CursorTrackingCallback) => void,
  refCallback: (element: HTMLElement) => void,
  elementState: MutableRefObject<Partial<IElementState>>
] => {
  const isClientSide = useClientHook();
  const [cursorPosition, registerCursorCallback, unregisterCursorCallback] =
    useCursorContext();
  const [
    elementState,
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    refCallback,
  ] = useElementTracking({
    trackedProperties: ["width", "height", "left", "relativeTop", "inViewport"],
  });
  const [
    registerCursorTrackingCallback,
    unregisterCursorTrackingCallback,
    cursorTrackingCallbacks,
  ] = useRegisteredCallbacks<CursorTrackingCallback>([]);
  const currentCursorPosition = useRef(
    cursorPosition.current.currentPosition || { x: 0, y: 0 }
  );

  const getPercent = useCallback(
    (newCursorPosition: IPos) => {
      return {
        x:
          Math.round(
            (newCursorPosition.x / (elementState.current.width || 0)) * 10000
          ) / 100,
        y:
          Math.round(
            (newCursorPosition.y / (elementState.current.height || 0)) * 10000
          ) / 100,
      };
    },
    [elementState.current]
  );

  const updateCursor = useEventCallback(
    (
      newPosition: { x: number; y: number },
      newElementState: Partial<IElementState>
    ) => {
      let xPosition = newPosition ? newPosition.x : 0;
      let yPosition = newPosition ? newPosition.y : 0;

      if (elementState.current) {
        xPosition = Math.min(
          Math.max(0, xPosition - (newElementState.left || 0)),
          newElementState.width || 0
        );
        yPosition = Math.min(
          Math.max(0, yPosition - (newElementState.relativeTop || 0)),
          newElementState.height || 0
        );
      }

      const newPixels = { x: xPosition, y: yPosition };
      cursorTrackingCallbacks.current.map((callback: CursorTrackingCallback) =>
        callback({
          pixels: newPixels,
          percent: getPercent(newPixels),
        })
      );
    },
    [elementState.current, cursorTrackingCallbacks.current]
  );

  const trackedElementCallback = useEventCallback(
    (newElementState: Partial<IElementState>) => {
      updateCursor(currentCursorPosition.current, newElementState);
    },
    [cursorTrackingCallbacks.current]
  );

  const cursorCallback = useEventCallback(
    (currentPosition?: IPos, previousPosition?: IPos) => {
      const newPosition = currentPosition || { x: 0, y: 0 };
      currentCursorPosition.current = newPosition;
      updateCursor(newPosition, elementState.current);
    },
    [updateCursor, currentCursorPosition.current]
  );

  useEffect(() => {
    !!elementState &&
      updateCursor(currentCursorPosition.current, elementState.current);
  }, [currentCursorPosition.current, elementState, updateCursor]);

  useEffect(() => {
    if (isClientSide) {
      registerCursorCallback(cursorCallback);
      registerElementTrackingCallback(trackedElementCallback);
    }

    return () => {
      unregisterCursorCallback(cursorCallback);
      unregisterElementTrackingCallback(trackedElementCallback);
    };
  }, [isClientSide]);

  return [
    registerCursorTrackingCallback,
    unregisterCursorTrackingCallback,
    refCallback,
    elementState,
  ];
};

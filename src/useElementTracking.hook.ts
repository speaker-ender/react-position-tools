import { useCallback, useEffect, useRef, useState } from "react";
import {
  bottomEdgeDistance,
  leftEdgeDistance,
  topEdgeDistance,
  rightEdgeDistance,
  rawWidth,
  rawHeight,
} from "@speaker-ender/js-measure";
import { useWindowContext } from "./window.context";
import { useScrollContext } from "@speaker-ender/react-scrollr";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { throttle } from "throttle-debounce";
import { useRegisteredCallbacks } from "./helpers/hooks";

const UPDATE_INTERVAL = 10;
export type IElementState = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  relativeTop: number;
  relativeBottom: number;
  width: number;
  height: number;
};

const defaultScrollDependantAttributes: (keyof IElementState)[] = [
  "relativeTop",
  "relativeBottom",
];
const defaultResizeDependantAttributes: (keyof IElementState)[] = [
  "width",
  "height",
  "top",
  "left",
  "bottom",
  "right",
  ...defaultScrollDependantAttributes,
];

export interface IElementTrackingOptions {
  trackedProperties?: (keyof IElementState)[];
  updateInterval?: number;
}

export type TrackedElementCallback = (
  elementState: Partial<IElementState>
) => void;

export const useElementTrackingState = (props?: IElementTrackingOptions) => {
  const {
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    refCallback,
  } = useElementTracking(props);
  const [elementState, setElementState] = useState<Partial<IElementState>>({});

  const updateElementState = useCallback(
    (newElementState: Partial<IElementState>) => {
      setElementState({ ...elementState, ...newElementState });
    },
    [elementState, setElementState]
  );

  useEffect(() => {
    registerElementTrackingCallback(updateElementState);

    return () => {
      unregisterElementTrackingCallback(updateElementState);
    };
  }, [updateElementState]);

  return {
    elementState,
    refCallback,
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
  };
};

export const useElementTracking = (props?: IElementTrackingOptions) => {
  const interval = props?.updateInterval || UPDATE_INTERVAL;
  const isClientSide = useClientHook();

  const scrollDependantAttributes = props?.trackedProperties
    ? defaultScrollDependantAttributes.filter((attribute) =>
        props.trackedProperties?.includes(attribute)
      )
    : defaultScrollDependantAttributes;
  const resizeDependantAttributes = props?.trackedProperties
    ? defaultResizeDependantAttributes.filter((attribute) =>
        props.trackedProperties?.includes(attribute)
      )
    : defaultResizeDependantAttributes;

  const { registerResizeCallback, unregisterResizeCallback } =
    useWindowContext();
  const { registerScrollCallback, unregisterScrollCallback } =
    useScrollContext();

  const [elementRef, setElementRef] = useState<HTMLElement>(null!);
  const elementState = useRef<Partial<IElementState>>({});
  const [
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    elementTrackingCallbacks,
  ] = useRegisteredCallbacks<TrackedElementCallback>([]);

  const getElementProps = useCallback(
    (getNewProp: Extract<keyof IElementState, string>[]) => {
      return getNewProp.reduce((propObj, nextPropName) => {
        let newValue = 0;
        if (elementRef) {
          switch (nextPropName) {
            case "top":
              newValue = topEdgeDistance(elementRef, "document");
              break;
            case "left":
              newValue = leftEdgeDistance(elementRef, "viewport");
              break;
            case "bottom":
              newValue = bottomEdgeDistance(elementRef, "document");
              break;
            case "right":
              newValue = rightEdgeDistance(elementRef, "viewport");
              break;
            case "relativeTop":
              newValue = topEdgeDistance(elementRef, "viewport");
              break;
            case "relativeBottom":
              newValue = bottomEdgeDistance(elementRef, "viewport");
              break;
            case "width":
              newValue = rawWidth(elementRef);
              break;
            case "height":
              newValue = rawHeight(elementRef);
              break;
          }
        }
        propObj[nextPropName] = newValue;
        return propObj;
      }, {} as Partial<IElementState>);
    },
    [elementRef, elementState]
  );

  const refCallback = useCallback((element: HTMLElement | null) => {
    element && setElementRef(element);
  }, []);

  const updateCallback = useCallback(
    (getNewProp: Extract<keyof IElementState, string>[]) => {
      elementTrackingCallbacks.current.map((elementTrackingCallback) =>
        elementTrackingCallback(getElementProps(getNewProp))
      );
    },
    [elementTrackingCallbacks, getElementProps]
  );

  const throttledUpdateCallback = throttle(interval, updateCallback);

  const scrollStateCallback = useCallback(
    (newCurrentScroll?: number, newPreviousScroll?: number) => {
      if (!!newCurrentScroll) {
        throttledUpdateCallback(scrollDependantAttributes);
      }
    },
    [throttledUpdateCallback]
  );

  const windowStateCallback = useCallback(
    (newHeight: number, newWidth: number) => {
      throttledUpdateCallback(resizeDependantAttributes);
    },
    [throttledUpdateCallback]
  );

  useEffect(() => {
    elementRef && throttledUpdateCallback(resizeDependantAttributes);

    return () => {};
  }, [elementRef]);

  useEffect(() => {
    if (!!isClientSide) {
      scrollDependantAttributes.length > 0 &&
        registerScrollCallback(scrollStateCallback);
      registerResizeCallback && registerResizeCallback(windowStateCallback);
    }

    return () => {
      unregisterScrollCallback(scrollStateCallback);
      unregisterResizeCallback && unregisterResizeCallback(windowStateCallback);
    };
  }, [isClientSide]);

  return {
    elementState,
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    refCallback,
  };
};

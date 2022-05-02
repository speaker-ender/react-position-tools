import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
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
import {
  useClientHook,
  useEventCallback,
} from "@speaker-ender/react-ssr-tools";
import { throttle } from "throttle-debounce";
import { useRegisteredCallbacks } from "./helpers/hooks";
import { useViewportContext } from "./viewport.context";

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
  inViewport: boolean;
};

const defaultScrollDependantAttributes: (keyof IElementState)[] = [
  "relativeTop",
  "relativeBottom",
  "inViewport",
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

export const useElementTracking = (
  props?: IElementTrackingOptions
): [
  elementState: MutableRefObject<Partial<IElementState>>,
  registerScrollCallback: (callback: TrackedElementCallback) => void,
  unregisterScrollCallback: (callback: TrackedElementCallback) => void,
  refCallback: (element: HTMLElement) => void
] => {
  const interval = props?.updateInterval || UPDATE_INTERVAL;
  const isClientSide = useClientHook();
  const { viewportDimensions } = useViewportContext();

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
  const [scrollRef, registerScrollCallback, unregisterScrollCallback] =
    useScrollContext();

  const elementRef = useRef<HTMLElement | undefined>();
  const elementState = useRef<Partial<IElementState>>({});
  const [
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    elementTrackingCallbacks,
  ] = useRegisteredCallbacks<TrackedElementCallback>([]);

  const inViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return (
      rect.top <=
        (viewportDimensions ? viewportDimensions.current.height : 0) &&
      rect.bottom >= 0
    );
  };

  const getElementProps = (
    getNewProp: Extract<keyof IElementState, string>[]
  ) => {
    return getNewProp.reduce((propObj, nextPropName) => {
      if (elementRef.current) {
        switch (nextPropName) {
          case "top":
            propObj.top = topEdgeDistance(elementRef.current, "document");
            break;
          case "left":
            propObj.left = leftEdgeDistance(elementRef.current, "viewport");
            break;
          case "bottom":
            propObj.bottom = bottomEdgeDistance(elementRef.current, "document");
            break;
          case "right":
            propObj.right = rightEdgeDistance(elementRef.current, "viewport");
            break;
          case "relativeTop":
            propObj.relativeTop = topEdgeDistance(
              elementRef.current,
              "viewport"
            );
            break;
          case "relativeBottom":
            propObj.relativeBottom = bottomEdgeDistance(
              elementRef.current,
              "viewport"
            );
            break;
          case "width":
            propObj.width = rawWidth(elementRef.current);
            break;
          case "height":
            propObj.height = rawHeight(elementRef.current);
            break;
          case "inViewport":
            propObj.inViewport = inViewport(elementRef.current);
            break;
        }
      }
      return propObj;
    }, {} as Partial<IElementState>);
  };

  const refCallback = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        elementRef.current = element;
      }
    },
    [elementRef.current]
  );

  const updateCallback = useEventCallback(
    (getNewProp: Extract<keyof IElementState, string>[]) => {
      const newProps = getElementProps(getNewProp);
      const mergedProps = { ...elementState.current, ...newProps };
      elementTrackingCallbacks.current.map((elementTrackingCallback) => {
        elementTrackingCallback(mergedProps);
      });

      elementState.current = mergedProps;
    },
    [elementTrackingCallbacks.current, getElementProps]
  );

  const throttledUpdateCallback = throttle(interval, updateCallback);

  const scrollStateCallback = useEventCallback(
    (newCurrentScroll?: number, newPreviousScroll?: number) => {
      if (newCurrentScroll && newCurrentScroll !== newPreviousScroll) {
        updateCallback(scrollDependantAttributes);
      }
    },
    [throttledUpdateCallback, elementTrackingCallbacks]
  );

  const windowStateCallback = useCallback(
    (newHeight: number, newWidth: number) => {
      throttledUpdateCallback(resizeDependantAttributes);
    },
    [throttledUpdateCallback, elementTrackingCallbacks]
  );

  useEffect(() => {
    elementRef.current && throttledUpdateCallback(resizeDependantAttributes);
  }, [resizeDependantAttributes, throttledUpdateCallback]);

  useEffect(() => {
    if (isClientSide) {
      scrollDependantAttributes.length > 0 &&
        registerScrollCallback(scrollStateCallback);
      registerResizeCallback && registerResizeCallback(windowStateCallback);
    }

    return () => {
      unregisterScrollCallback(scrollStateCallback);
      unregisterResizeCallback && unregisterResizeCallback(windowStateCallback);
    };
  }, [isClientSide]);

  return [
    elementState,
    registerElementTrackingCallback,
    unregisterElementTrackingCallback,
    refCallback,
  ];
};

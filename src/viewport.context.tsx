import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { rawHeight, rawWidth } from "@speaker-ender/js-measure";
import { useRegisteredCallbacks } from "./helpers/hooks";
import { useWindowContext } from "./window.context";

export type IWindowOptions = {
  stateInterval: number;
  listenerInterval: number;
};

export type IViewportState = Partial<ReturnType<typeof useViewportState>>;

export const ViewportContext = createContext<IViewportState | null>(null);

export interface IViewportContextProvider extends Partial<IWindowOptions> {
  children?: ReactNode;
}

export interface IViewportDimensions {
  width: number;
  height: number;
}

const selectViewportDimensions = (
  elementRef: HTMLElement
): IViewportDimensions => {
  return {
    height: rawHeight(elementRef),
    width: rawWidth(elementRef),
  };
};

export type ResizeCallback = (height: number, width: number) => void;

export const useViewportState = (fakeRef: HTMLDivElement | null) => {
  const isClientSide = useClientHook();
  const viewportDimensions = useRef<IViewportDimensions>(
    fakeRef ? selectViewportDimensions(fakeRef) : { height: 0, width: 0 }
  );
  const { registerResizeCallback, unregisterResizeCallback } =
    useWindowContext();
  const [
    registerViewportCallback,
    unregisterViewportCallback,
    viewportCallbacks,
  ] = useRegisteredCallbacks<ResizeCallback>([]);

  const resizeCallback = useCallback(() => {
    if (fakeRef) {
      if (viewportDimensions.current) {
        const newViewportDimensions = selectViewportDimensions(fakeRef);

        if (newViewportDimensions !== viewportDimensions.current) {
          viewportDimensions.current = newViewportDimensions;

          viewportCallbacks.current &&
            viewportCallbacks.current.map((callback) => {
              callback(
                newViewportDimensions.height,
                newViewportDimensions.width
              );
            });
        }
      }
    }
  }, [fakeRef]);

  useEffect(() => {
    resizeCallback();
  }, [fakeRef]);

  useEffect(() => {
    isClientSide &&
      registerResizeCallback &&
      registerResizeCallback(resizeCallback);

    return () => {
      isClientSide &&
        unregisterResizeCallback &&
        unregisterResizeCallback(resizeCallback);
    };
  }, [
    isClientSide,
    registerResizeCallback,
    resizeCallback,
    unregisterResizeCallback,
  ]);

  return {
    viewportDimensions,
    registerViewportCallback,
    unregisterViewportCallback,
  };
};

export const useViewportContext = () => {
  const viewportContext = React.useContext(ViewportContext);

  if (!viewportContext) {
    throw new Error("ViewportContext used outside of ViewportContext.Provider");
  }

  return viewportContext;
};

export const ViewportContextProvider: React.FC<IViewportContextProvider> = (
  props
) => {
  const fakeHeightRef = React.useRef<HTMLDivElement>(null);
  const viewportState = useViewportState(fakeHeightRef.current);

  return (
    <ViewportContext.Provider value={viewportState}>
      <div
        style={{
          position: "absolute",
          visibility: "hidden",
          // height: `calc(100vh - var(--uiHeight))`,
          width: "100%",
          height: `100vh`,
          pointerEvents: "none",
        }}
        ref={fakeHeightRef}
      />
      {props.children}
    </ViewportContext.Provider>
  );
};

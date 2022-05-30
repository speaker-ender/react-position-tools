import * as React from "react";
import ImageComponent from "../content/image";
import { useCursorTracking } from "@speaker-ender/react-position-tools";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyledCursorParalax,
  StyledCursorParalaxWrapper,
} from "./cursorParalax.styles";
import { IPos } from "@speaker-ender/react-position-tools/dist/cursor.context";
import { Paragraph } from "../../global/typography";
import { ICursorTrackingState } from "@speaker-ender/react-position-tools/dist/useCursorTracking.hook";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import ParagraphComponent from "../content/paragraph";

interface ICursorParalax {
  style?: React.CSSProperties;
  wireframe?: boolean;
  positionCallback?: (activePixels: IPos, activePercent: IPos) => void;
}

const CursorParalax: React.FC<ICursorParalax> = (props) => {
  const isClient = useClientHook();
  const [
    registerCursorTrackingCallback,
    unregisterCursorTrackingCallback,
    refCallback,
  ] = useCursorTracking();
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLElement | null>(null);
  const paragraphRef = useRef<HTMLElement | null>(null);

  const isHover = useCallback((percent: IPos) => {
    const newIsHover = !(
      !percent.x ||
      !percent.y ||
      percent.x == 100 ||
      percent.y == 100
    );

    return newIsHover;
  }, []);

  const getDecimalPercent = (percentValue: number) => {
    return percentValue / 100;
  };

  const getOffsetXPercent = (percentValue: number) => {
    return getDecimalPercent(percentValue) * 2 - 1;
  };

  const getOffsetYPercent = (percentValue: number) => {
    return getDecimalPercent(percentValue) * -2 + 1;
  };

  const cursorCallback = useCallback(
    (state: ICursorTrackingState) => {
      const isHovering = isHover(state.percent);
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = isHover(state.percent)
          ? `rotateY(${getOffsetXPercent(state.percent.x) * 8}deg) rotateX(${
              getOffsetYPercent(state.percent.y) * 8
            }deg) translate3d( 0, -2px, 0 )`
          : "rotateY(0deg) rotateX(0deg)";
      }
      if (imageRef.current) {
        imageRef.current.style.transform = isHover(state.percent)
          ? `scale(0.9)`
          : `scale(0.8)`;
        imageRef.current.style.backgroundPosition = isHover(state.percent)
          ? `${(state.percent.x / 1.5 + 25).toPrecision(3)}% ${(
              state.percent.y / 1.5 +
              25
            ).toPrecision(3)}%`
          : "";
      }
      if (paragraphRef.current) {
        paragraphRef.current.style.transform = isHover(state.percent)
          ? `rotateY(${getOffsetXPercent(state.percent.x) * 5}deg) rotateX(${
              getOffsetYPercent(state.percent.y) * 5
            }deg) translate3d(-50%, -100%, 150px )`
          : "translate3d(-50%, -100%, 150px ) rotateY(0deg) rotateX(0deg)";
      }
    },
    [isHover]
  );

  const parallaxRefCallback = useCallback(
    (element: HTMLDivElement) => {
      parallaxRef.current = element;
      refCallback(element);
    },
    [refCallback, parallaxRef]
  );

  useEffect(() => {
    if (isClient) {
      registerCursorTrackingCallback(cursorCallback);
    }

    return () => unregisterCursorTrackingCallback(cursorCallback);
  }, [
    cursorCallback,
    isClient,
    registerCursorTrackingCallback,
    unregisterCursorTrackingCallback,
  ]);

  return (
    <StyledCursorParalaxWrapper wireframe={props.wireframe}>
      <StyledCursorParalax
        wireframe={props.wireframe}
        ref={parallaxRefCallback}
      >
        <ImageComponent
          coloredBackground={true}
          refCallback={(element) => (imageRef.current = element)}
        />
        <ParagraphComponent
          refCallback={(element) => (paragraphRef.current = element)}
        >
          Text
        </ParagraphComponent>
      </StyledCursorParalax>
    </StyledCursorParalaxWrapper>
  );
};

export default CursorParalax;

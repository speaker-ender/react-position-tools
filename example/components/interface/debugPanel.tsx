import { height, width } from "@speaker-ender/js-measure";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import * as React from "react";
import { ReactNode, useCallback, useRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import {
  StyledDebugCloseButton,
  StyledDebugContent,
  StyledDebugContentWrapper,
  StyledDebugPanel,
  StyledDebugPanelWrapper,
} from "./debugPanel.styles";
import { CSSTransition } from "react-transition-group";
import { theme } from "../../global/theme.styles";

export interface IDebugPanel {
  title?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

type PanelSize = {
  x?: number;
  y?: number;
};

const DebugPanel: React.FC<IDebugPanel> = (props) => {
  const isClient = useClientHook();
  const { isToggled, updateToggled } = useToggle({
    initialState: props.defaultOpen,
  });
  const [panelSize, setPanelSize] = useState<PanelSize>({ x: 0, y: 0 });
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [hasScrollBar, setHasScrollBar] = useState(false);
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    if (isClient) {
      !!panelWrapperRef.current &&
        setWrapperWidth(width(panelWrapperRef.current));
      !!contentRef.current && setPanelSize({ x: 0, y: 0 });
    }
  }, [contentRef, setPanelSize, isClient, setWrapperWidth]);

  const onEntering = useCallback(() => {
    isClient &&
      !!contentRef.current &&
      setPanelSize({
        x: width(contentRef.current),
        y: height(contentRef.current),
      });
  }, [contentRef, setPanelSize, isClient]);

  const onEntered = useCallback(() => {
    isClient && !!contentRef.current && setPanelSize({});
    isClient && setHasScrollBar(true);
  }, [contentRef, setPanelSize, setHasScrollBar, isClient]);

  const onExit = React.useCallback(() => {
    isClient &&
      !!contentRef.current &&
      setPanelSize({
        x: width(contentRef.current),
        y: height(contentRef.current),
      });
  }, [contentRef, setPanelSize, isClient]);

  const onExiting = React.useCallback(() => {
    isClient && !!contentRef.current && setPanelSize({ x: 0, y: 0 });
    isClient && setHasScrollBar(false);
  }, [contentRef, setPanelSize, setHasScrollBar, isClient]);

  return (
    <StyledDebugPanelWrapper ref={panelWrapperRef}>
      <StyledDebugPanel open={!!isToggled}>
        <StyledDebugCloseButton onClick={() => updateToggled()}>
          {!!isToggled ? "❌" : "🐞"}
        </StyledDebugCloseButton>
        <CSSTransition
          timeout={500}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          nodeRef={contentRef}
          in={!!isToggled}
        >
          <StyledDebugContentWrapper
            style={{
              maxHeight: `${panelSize.y}px` || "none",
              maxWidth: `${panelSize.x}px` || "none",
              overflowY: hasScrollBar ? "scroll" : "hidden",
            }}
          >
            <StyledDebugContent
              ref={contentRef}
              style={{
                width: `calc(${wrapperWidth}px - (${theme.spacingProps.defaultSpacing} * 4))`,
              }}
              open={!!isToggled}
            >
              {props.children}
            </StyledDebugContent>
          </StyledDebugContentWrapper>
        </CSSTransition>
      </StyledDebugPanel>
    </StyledDebugPanelWrapper>
  );
};

export default DebugPanel;

import styled from "styled-components";
import { media } from "../../../global/variables/breakpoints";
import { LAYERS } from "../../../global/variables/layers";
import { StyledBannerMessage } from "../../interface/bannerMessage.styles";
import { StyledDebugPanelWrapper } from "../../interface/debugPanel.styles";
import { StyledNotificationTray } from "../../interface/notificationTray.styles";

interface IStyledOverlayLayout {
  sidebarStyle?: boolean;
}

// Grid Key
// n: notification
// b: banner
// d: debugger
// s: scrollbar  // I hate this but this seems like the best solution
// f: fuck you scrollbar for making me do this

export const StyledOverlayLayout = styled.div<IStyledOverlayLayout>`
  display: grid;
  position: fixed;
  bottom: env(safe-area-inset-bottom, 0px);
  left: 0;
  height: calc(
    100vh - ${(p) => p.theme.spacingProps.headerHeight} -
      env(safe-area-inset-top) - env(safe-area-inset-bottom)
  );
  max-height: calc(100vh - ${(p) => p.theme.spacingProps.headerHeight});
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  grid:
    "f d d d d d d s" min-content
    "f n n n n n n s" min-content
    "b b b b b b b b" min-content
    / 10px 1fr 1fr 1fr 1fr 1fr 1fr 10px;
  align-content: end;
  align-items: end;
  grid-auto-flow: dense;
  pointer-events: none;
  overflow: hidden;
  z-index: ${LAYERS.overlay};

  @media ${media.tablet} {
    grid:
      "f . . . . d d s" min-content
      "f . . . . n n s" min-content
      "b b b b b b b b" min-content
      / 10px 1fr 1fr 1fr 1fr 1fr 1fr 10px;
    z-index: ${(p) => p.sidebarStyle && LAYERS.alert};
  }

  & ${StyledDebugPanelWrapper} {
    grid-area: d;
  }

  & ${StyledNotificationTray} {
    grid-row-start: n;
    grid-column-start: n;
    grid-row-end: n;
    grid-column-end: s;
  }

  & ${StyledBannerMessage} {
    grid-area: b;
  }
`;

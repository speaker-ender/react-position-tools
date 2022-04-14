import styled from "styled-components";
import { transition } from "../global/animation.styles";
import { InterfaceBackgroundStyles } from "../global/background.styles";
import { LAYERS } from "../global/variables/layers";
import { OPACITY } from "../global/variables/opacity";

interface IStyledPopover {
  isActive: boolean;
}

export const StyledOverlay = styled.div<IStyledPopover>`
  ${InterfaceBackgroundStyles}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  opacity: ${(p) => (p.isActive ? OPACITY.none : OPACITY.full)};
  pointer-events: ${(p) => (p.isActive ? "all" : "none")};
  transition: opacity ${transition.appear}, backdrop-filter ${transition.appear};
  z-index: ${LAYERS.overlay};
`;

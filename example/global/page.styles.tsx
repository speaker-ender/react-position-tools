import styled from "styled-components";
import { IStyledGrid } from "../components/grid.styles";
import {
  ContentLayoutStyles,
  StyledContentLayout,
} from "../components/layouts/page/content.layout.styles";
import { transition } from "./animation.styles";
import { theme } from "./theme.styles";
import { OPACITY } from "./variables/opacity";

interface IStyledPage extends IStyledGrid {}

export const StyledPage = styled.div<IStyledPage>`
  display: contents;
  ${ContentLayoutStyles}
`;

export const StyledPageTransition = styled.div<IStyledPage>`
  display: contents;

  & ${StyledContentLayout} {
    transition: opacity ${transition.appear}, filter ${transition.appear};
  }

  &.enter ${StyledContentLayout} {
    opacity: ${OPACITY.full};
    filter: blur(${theme.backgroundStyle.blur}px);
  }

  &.enter-active ${StyledContentLayout} {
    opacity: ${OPACITY.none};
    filter: blur(0px);
  }

  &.enter-done ${StyledContentLayout} {
    opacity: ${OPACITY.none};
  }

  &.exit ${StyledContentLayout} {
    opacity: ${OPACITY.none};
    filter: blur(0px);
  }

  &.exit-active ${StyledContentLayout} {
    opacity: ${OPACITY.full};
    filter: blur(${theme.backgroundStyle.blur}px);
  }

  &.exit-done ${StyledContentLayout} {
    opacity: ${OPACITY.full};
  }
`;

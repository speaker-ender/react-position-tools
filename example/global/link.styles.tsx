import styled, { css } from "styled-components";
import { transition } from "./animation.styles";
import { FONTS } from "./typography";
import { OPACITY } from "./variables/opacity";

export const LinkStyles = css`
  color: ${(p) => p.theme.themeProps.text};
  opacity: ${OPACITY.medium};
  text-decoration: none;
  transition: opacity ${transition.hover};

  &:hover {
    opacity: ${OPACITY.none};
  }
`;

export const StyledLink = styled.div`
  display: inline;
  font-family: ${FONTS.mainBold};

  a {
    ${LinkStyles};
  }
`;

import { Header2, Header2Style, Header3Style } from "../../global/typography";
import styled, { css } from "styled-components";
import { LAYERS } from "../../global/variables/layers";
import { LinkStyles } from "../../global/link.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";
import { theme } from "../../global/theme.styles";
import { transition } from "../../global/animation.styles";
import { media } from "../../global/variables/breakpoints";
import { OPACITY } from "../../global/variables/opacity";

interface IStyledHeader {}

export const StyledHeader = styled.div<IStyledHeader>`
  ${InterfaceBackgroundStyles}
  position: sticky;
  display: grid;
  grid-template-columns: 25px repeat(3, 1fr) min-content 25px;
  grid-template-rows: 1fr;
  column-gap: 25px;
  row-gap: 25px;
  align-content: center;
  top: 0;
  width: 100%;
  color: ${(p) => p.theme.themeProps.text};
  box-shadow: ${`0px 2px 6px -4px ${theme.themeProps.backgroundInvertMediumOpacity}`};
  z-index: ${LAYERS.header};
`;

export const StyledHeaderTitle = styled(Header2)`
  grid-column: 2 / span 3;
  grid-row: 1;

  a {
    ${LinkStyles};
  }
`;

export const HamPartStyles = css`
  height: 0.15rem;
  width: 100%;
  border-radius: 0.05rem;
  transition: transform ${transition.appear},
    background-color ${transition.appear}, opacity ${transition.hover};
  transform-origin: 22px 0px;

  &:nth-last-of-type(2) {
    transform-origin: 19px 2px;
  }
`;

export const HamPartOpenStyles = css`
  transform: translate3d(0px, 22px, 0) rotate(0deg);

  &:nth-last-of-type(2) {
    transform: translate3d(0px, 10px, 0) rotate(0deg);
  }
`;

export const HamPartCloseStyles = css`
  transform: translate3d(0px, 1rem, 0) rotate(45deg);

  &:nth-last-of-type(2) {
    transform: translate3d(0px, 1.1rem, 0) rotate(-45deg);
  }
`;

export const NavHamStyles = css`
  height: 2.5rem;
  width: 2.5rem;
  opacity: ${OPACITY.none};
  transition: opacity ${transition.hover};
  overflow: hidden;
  cursor: pointer;

  &:hover {
    opacity: ${OPACITY.medium};
  }
`;

export const StyledHamPart = styled.div`
  ${HamPartStyles}
  background-color: ${(p) => p.theme.themeProps.text};
`;

interface IStyledHam {
  isOpen?: boolean;
}

export const StyledHam = styled.div<IStyledHam>`
  ${NavHamStyles}
  grid-column: 5 / span 1;
  align-self: center;
  justify-self: right;

  @media ${media.tabletLandscape} {
    visibility: hidden;
  }

  & ${StyledHamPart} {
    ${(p) => (p.isOpen ? HamPartCloseStyles : HamPartOpenStyles)}
  }
`;

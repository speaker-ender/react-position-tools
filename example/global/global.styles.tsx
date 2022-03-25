import { createGlobalStyle } from "styled-components";
import { transition } from "./animation.styles";
import { darkThemeProps, lightThemeProps } from "./theme.styles";
import { media } from "./variables/breakpoints";
import { spacingProps } from "./variables/cssProp";

export const GlobalStyle = createGlobalStyle`
  body {
    ${spacingProps}

    ${props => !!props.theme.themeStyle ? props.theme.themeStyle === 'dark' ? darkThemeProps : lightThemeProps : ''};

    margin: 0;
    background: ${p => p.theme.themeProps.background};
    transition: background-color ${transition.appear}, color ${transition.appearSecondary};
    font-size: 12px;

    @media ${media.tablet} {
      font-size: 15px;

    }

    @media ${media.desktop} {
      font-size: 17px;

    }
  }

  &.modal-open,
  &.nav-open {
    position: fixed;
    overflow-y: scroll;
  }

  .modal-open,
  .nav-open {
    width: 100%;
    overflow: hidden;
  }
`
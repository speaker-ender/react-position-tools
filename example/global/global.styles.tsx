import { createGlobalStyle } from "styled-components";
import { darkThemeProps, lightThemeProps } from "./theme.styles";

export const GlobalStyle = createGlobalStyle`
  :root {
    ${props => props.theme.isInvert ? darkThemeProps : lightThemeProps}

    @media (prefers-color-scheme: dark) {
        ${props => props.theme.isInvert ? lightThemeProps : darkThemeProps}
    }

    font-size: 17px;

    @media (max-width: 900px) {
      font-size: 15px;
    }
    @media (max-width: 400px) {
      font-size: 12px;
    }
  }

  body {
    margin: 0;
    background: ${p => p.theme.themeProps.background};
  }
`
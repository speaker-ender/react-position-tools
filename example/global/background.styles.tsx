import { css } from "styled-components";
import { transition } from "./animation.styles";

export const GlobalBackgroundStyles = css`
    backdrop-filter: ${p => `blur(${p.theme.backgroundStyle.blur}) hue-rotate(300deg)`};
    transition: background-color ${transition.appear};
`

export const InterfaceBackgroundStyles = css`
    ${GlobalBackgroundStyles};
    background-color: ${p => p.theme.themeProps.interfaceBackgroundMediumOpacity};
`

export const ContentBackgroundStyles = css`
    ${GlobalBackgroundStyles};
    background-color: ${p => p.theme.themeProps.contentBackgroundMediumOpacity};
`

export const InvertContentBackgroundStyles = css`
    background-color: ${p => p.theme.themeProps.backgroundInvert};
`

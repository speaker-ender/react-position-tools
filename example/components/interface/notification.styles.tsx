import { Header3Style, ParagraphTextStyle } from "../../global/typography";
import styled from "styled-components";
import { LAYERS } from "../../global/variables/layers";
import { LinkStyles } from "../../global/link.styles";
import { PanelStyles } from "../../global/panel.styles";
import { transition } from "../../global/animation.styles";
import { OPACITY } from "../../global/variables/opacity";
import { InterfaceBackgroundStyles } from "../../global/background.styles";

interface IStyledNotification {
}

export const StyledNotification = styled.div<IStyledNotification>`
    ${PanelStyles}
    ${InterfaceBackgroundStyles}
    margin: ${p => `calc(${p.theme.spacingProps.defaultSpacing} / 2) ${p.theme.spacingProps.defaultSpacing}`};
    display: grid;
    grid-template-columns: 25px repeat(4, 1fr) 25px;
    grid-template-rows: 1fr;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;
    bottom: 0;
    backdrop-filter: ${p => `blur(${p.theme.backgroundStyle.blur})px`};
    z-index: ${LAYERS.message};
    pointer-events: all;
`;

export const StyledNotificationWrapper = styled.div<IStyledNotification>`
    max-height: 0px;
    opacity: ${OPACITY.none};
    color: ${p => p.theme.themeProps.text};
    transform: translate3d(0px, 0px, 0px);
    transition: transform ${transition.appearSecondary}, opacity ${transition.appear},  max-height ${transition.appear}, min-height ${transition.appear};
    z-index: ${LAYERS.message};
    overflow: hidden;

    &.enter {
        opacity: ${OPACITY.full};
        transform: translate3d(100%, 0px, 0px);
    }

    &.enter-active {
        opacity: ${OPACITY.none};
        transform: translate3d(0px, 0px, 0px);
    }

    &.enter-done {
        opacity: ${OPACITY.none};
        transform: translate3d(0px, 0px, 0px);
    }

    &.exit {
        opacity: ${OPACITY.none};
        transform: translate3d(0px, 0px, 0px);
    }

    &.exit-active {
        opacity: ${OPACITY.full};
        transform: translate3d(100%, 0px, 0px);
    }

    &.exit-done {
        opacity: ${OPACITY.full};
        transform: translate3d(100%, 0px, 0px);
        max-height: 0px !important;
    }
`;

export const StyledNotificationContent = styled.div`
    grid-column: 2 / span 3;
    grid-row: 1;

    a {
        ${LinkStyles};
    }
`;

export const StyledNotificationTitle = styled.div`
    ${Header3Style}
`;

export const StyledNotificationText = styled.div`
    ${ParagraphTextStyle}
`;

export const StyledNotificationClose = styled.div`
    grid-column: 5 / span 1;
    margin-top: auto;
    margin-bottom: auto;
    align-self: right;
    justify-self: right;
    cursor: pointer;
    mix-blend-mode: difference;
    user-select: none;
`;
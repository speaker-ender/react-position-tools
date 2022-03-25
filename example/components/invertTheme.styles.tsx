import { ButtonStyles } from "../global/button.styles";
import styled from "styled-components";
import LightDark from "../assets/lightDark";
import { OPACITY } from "../global/variables/opacity";
import { transition } from "../global/animation.styles";

export interface IStyledInvertThemeButton {
    themeStyle?: string
}

export const StyledInvertThemeButton = styled.div<IStyledInvertThemeButton>`
    cursor: pointer;
    opacity: ${OPACITY.medium};
    transition: opacity ${transition.appear}, fill ${transition.appear};


    &:hover {
            opacity: ${OPACITY.none};
        }

    & svg {
        display: inline;
        max-height: 25px;
        max-width: 25px;
        transition: opacity ${transition.appear}, fill ${transition.appear};

        path {
            fill: ${p => p.theme.themeProps.backgroundInvert};
            transition: opacity ${transition.appear};
        }

    }

    & #sun path {
        opacity: ${props => props.themeStyle === 'dark' ? OPACITY.none : OPACITY.full};
    }

    & #moon path {
        opacity: ${props => props.themeStyle === 'light' ? OPACITY.none : OPACITY.full};
    }

`;

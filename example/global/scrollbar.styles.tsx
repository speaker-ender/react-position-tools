import { css } from "styled-components";
import { transition } from "./animation.styles";
import { theme } from "./theme.styles";

export const ScrollbarStyles = css`
    scrollbar-color: ${theme.themeProps.primary} ${theme.themeProps.backgroundHalfOpacity};

    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${theme.themeProps.primaryHalfOpacity};
        border-radius: 10px;
        box-shadow: 0px 0px 3px -1px ${p => p.theme.themeProps.backgroundInvertMediumOpacity};
        cursor: pointer;

        &:hover {
            background-color: ${theme.themeProps.primary}
        }
    }

    &::-webkit-scrollbar-track {
        transition: background-color ${transition.appear};

        &:hover {
            background-color: ${theme.themeProps.interfaceBackgroundHalfOpacity};
        }
    }
`;

import styled, { css } from "styled-components";
import { transition } from "./animation.styles";
import { theme } from "./theme.styles";

interface IStyledButton {
}

export const ButtonStyles = css`
    background-color: ${p => p.theme.themeProps.primary};
    color: ${p => p.theme.themeProps.text};
    border: none;
    padding: 10px 19px;
    border-radius: 12px;
    box-shadow: 0px 0px 1px ${theme.themeProps.secondary}, 0px 0px 1px ${theme.themeProps.tertiary};
    transition: box-shadow ${transition.hoverSecondary}, background-color ${transition.hover};
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.themeProps.primaryLight};
        box-shadow: 3px 3px 1px ${theme.themeProps.secondary}, -3px -3px 1px ${theme.themeProps.tertiary};
    }
`;

export const StyledButton = styled.button<IStyledButton>`
    ${ButtonStyles}
`;

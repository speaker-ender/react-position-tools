import styled from "styled-components";
import { InterfaceBackgroundStyles } from "./background.styles";
import { theme } from "./theme.styles";

interface IStyledInput {}

export const StyledInput = styled.input<IStyledInput>`
  ${InterfaceBackgroundStyles}
  color: ${(p) => p.theme.themeProps.text};
  border: none;
  padding: 10px 19px;
  margin: ${(p) => p.theme.spacingProps.textSpacingY} 0;
  border-radius: 5px;
  box-shadow: 0px 0px 1px ${theme.themeProps.secondary},
    0px 0px 1px ${theme.themeProps.tertiary};
  transition: box-shadow 450ms ease-in-out, background-color 250ms ease;

  &:hover,
  &:active,
  &:focus {
    background: ${(p) => p.theme.themeProps.contentBackground};
    box-shadow: 3px 3px 1px ${theme.themeProps.secondary},
      -3px -3px 1px ${theme.themeProps.tertiary};
  }
`;

export const StyledSelect = styled.select<IStyledInput>`
  ${InterfaceBackgroundStyles}
  color: ${(p) => p.theme.themeProps.text};
  border: none;
  padding: 10px 19px;
  border-radius: 5px;
  box-shadow: 0px 0px 1px ${theme.themeProps.secondary},
    0px 0px 1px ${theme.themeProps.tertiary};
  transition: box-shadow 450ms ease-in-out, background-color 250ms ease;

  &:hover,
  &:active,
  &:focus {
    background: ${(p) => p.theme.themeProps.contentBackground};
    box-shadow: 3px 3px 1px ${theme.themeProps.secondary},
      -3px -3px 1px ${theme.themeProps.tertiary};
  }
`;

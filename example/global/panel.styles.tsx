import styled, { css } from "styled-components";
import { ContentBackgroundStyles } from "./background.styles";

interface IStyledPanel {
  type?: "interface" | "content";
}

export const PanelStyles = css`
  padding: ${(p) => p.theme.spacingProps.defaultSpacing};
  margin-bottom: ${(p) => p.theme.spacingProps.defaultSpacing};
  border-radius: ${(p) => p.theme.rounding.borderRadius};
  box-shadow: ${(p) =>
    `0px 0px 6px -4px ${p.theme.themeProps.backgroundInvert}`};
`;

export const StyledPanel = styled.div<IStyledPanel>`
  ${PanelStyles}
  ${ContentBackgroundStyles}
`;

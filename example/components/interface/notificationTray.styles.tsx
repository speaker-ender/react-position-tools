import styled from "styled-components";
import { ScrollbarStyles } from "../../global/scrollbar.styles";
import { LAYERS } from "../../global/variables/layers";
interface IStyledNotificationTray {
  isActive?: boolean;
  noteCount?: number;
}

export const StyledNotificationTray = styled.div<IStyledNotificationTray>`
  height: 100%;
  width: 100%;
  overflow: hidden;
  pointer-events: all;
  z-index: ${LAYERS.message};
`;

export const StyledNotificationWrapper = styled.div<IStyledNotificationTray>`
  ${ScrollbarStyles}
  bottom: 0;
  padding: ${(p) => `calc(${p.theme.spacingProps.defaultSpacing} / 2) 0`};
  max-height: calc(50vh - ${(p) => p.theme.spacingProps.headerHeight});
  overflow: hidden;
  overflow-y: scroll;
`;

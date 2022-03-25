import styled from "styled-components";
import { transition } from "../../global/animation.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";
import { PanelStyles } from "../../global/panel.styles";
import { ScrollbarStyles } from "../../global/scrollbar.styles";
import { LAYERS } from "../../global/variables/layers";

interface IStyledDebugPanel {
    open?: boolean;
}

export const StyledDebugPanel = styled.div<IStyledDebugPanel>`
    ${PanelStyles}
    ${InterfaceBackgroundStyles}
    position: absolute;
    bottom: 0;
    right: 0;
    padding: ${p => p.theme.spacingProps.defaultSpacing};
    margin: ${p => `0 ${p.theme.spacingProps.defaultSpacing}`};
    justify-self: end;
    border-radius: ${p => p.theme.rounding.borderRadius};
    z-index: ${LAYERS.debug};
    pointer-events: all;
`;

export const StyledDebugPanelWrapper = styled.div<IStyledDebugPanel>`
    position: relative;
    height: 100%;
    width: 100%;
    bottom: 0;
    right: 0;
    z-index: ${LAYERS.debug};
`;

export const StyledDebugContentWrapper = styled.div<IStyledDebugPanel>`
    ${ScrollbarStyles}
    max-height: 0px;
    max-width: 0px;
    width: 100%;
    height: 100%;
    transition: max-height ${transition.appearSecondary}, max-width ${transition.appearSecondary}, opacity ${transition.appear};
    overflow: hidden;
    overflow-y: scroll;
`;

export const StyledDebugContent = styled.div<IStyledDebugPanel>`
    ${ScrollbarStyles}
    grid-area: d;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    max-height: 30vh;
    width: 100%;
    padding: ${p => p.theme.spacingProps.defaultSpacing} 0px;
`;

export const StyledDebugCloseButton = styled.div`
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;
`;
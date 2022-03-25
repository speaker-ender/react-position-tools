import styled from "styled-components";
import { InterfaceBackgroundStyles } from "../global/background.styles";
import { PanelStyles } from "../global/panel.styles";
import { SmallTextStyle } from "../global/typography";
import { LAYERS } from "../global/variables/layers";
import { OPACITY } from "../global/variables/opacity";

interface IStyledPopover {
    open: boolean;
}

export const StyledPopover = styled.div<IStyledPopover>`
    position: relative;
    display: inline;
`;

export const StyledPopoverContent = styled.div<IStyledPopover>`
    ${SmallTextStyle}
    ${PanelStyles}
    ${InterfaceBackgroundStyles}
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: ${p => p.theme.spacingProps.defaultSpacing};
    margin: ${p => p.theme.spacingProps.defaultSpacing};
    max-height: ${p => `calc(100vh - ${p.theme.spacingProps.headerHeight})`};
    width: 100%;
    max-width: 100vw;
    min-width: 200px;
    color: ${p => p.theme.themeProps.text};
    opacity: ${p => p.open ? OPACITY.none : OPACITY.full};
    pointer-events: ${p => p.open ? 'all' : 'none'};
    overflow-y: scroll;
    z-index: ${LAYERS.popover};
    overflow-x: hidden;
`;

export const StyledPopoverIcon = styled.div`
    position: relative;
    display: inline;
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;
    user-select: none;

    &:hover {
        color: ${p => p.theme.themeProps.primary};
    }
`;

export const StyledPopoverCloseButton = styled.div`
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;

    &:hover {
        color: ${p => p.theme.themeProps.primary};
    }
`;
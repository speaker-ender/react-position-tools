import styled from "styled-components";
import { SmallTextStyle } from "../global/typography";
import { LAYERS } from "../global/variables/layers";

interface IStyledPopover {
    open: boolean;
}

export const StyledPopover = styled.div<IStyledPopover>`
    position: relative;
    display: inline;
`;

export const StyledPopoverContent = styled.div<IStyledPopover>`
    ${SmallTextStyle}
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 25px 50px;
    margin: 25px;
    max-height: calc(100vh - 55px);
    width: 100%;
    max-width: 100vw;
    min-width: 200px;
    border-radius: ${p => p.theme.rounding.borderRadius};
    background: ${p => p.theme.themeProps.tertiaryHalfOpacity};
    backdrop-filter: blur(7px);
    color: ${p => p.theme.themeProps.text};
    opacity: ${p => p.open ? '1' : '0'};
    overflow-y: scroll;
    z-index: ${LAYERS.popover};
    overflow: hidden;
`;

export const StyledPopoverIcon = styled.div`
    position: relative;
    display: inline;
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;

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
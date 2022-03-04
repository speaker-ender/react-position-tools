import styled from "styled-components";
import { LAYERS } from "../global/variables/layers";

interface IStyledPopover {
    isActive: boolean;
}

export const StyledOverlay = styled.div<IStyledPopover>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    opacity: ${p => p.isActive ? '1' : '0'};
    background: ${p => p.theme.themeProps.tertiaryPartialOpacity};
    backdrop-filter: blur(15px);
    pointer-events: ${p => p.isActive ? '' : 'none'};
    z-index: ${LAYERS.overlay};
`;
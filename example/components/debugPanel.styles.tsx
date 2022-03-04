import styled from "styled-components";
import { StyledPanel } from "../global/panel.styles";
import { LAYERS } from "../global/variables/layers";

interface IStyledDebugPanel {
    open: boolean;
}

export const StyledDebugPanel = styled(StyledPanel) <IStyledDebugPanel>`
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 25px 50px;
    margin: 25px;
    max-height: calc(100vh - 55px);
    max-width: 100vw;
    background: ${p => p.theme.themeProps.tertiaryPartialOpacity};
    backdrop-filter: blur(15px);
    border-radius: ${p => p.theme.rounding.borderRadius};
    overflow-y: scroll;
    z-index: ${LAYERS.debug};
`;

export const StyledDebugContent = styled.div<IStyledDebugPanel>`
    max-height: ${p => p.open ? 'auto' : '0px'};
    max-width: ${p => p.open ? 'auto' : '0px'};
    overflow: hidden;
`;

export const StyledDebugCloseButton = styled.div`
    color: ${p => p.theme.themeProps.text}
`;
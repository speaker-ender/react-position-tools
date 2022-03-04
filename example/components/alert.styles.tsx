import { Header2Style, Paragraph } from "../global/typography";
import styled from "styled-components";
import { PanelStyles } from "../global/panel.styles";
import { LAYERS } from "../global/variables/layers";

interface IStyledAlert {
    active: boolean;
}

export const StyledAlert = styled.div<IStyledAlert>`
    ${PanelStyles};
    position: fixed;
    top: 50vh;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    max-height: 100vh;
    max-width: 80vw;
    overflow-y: scroll;
    margin-left: auto;
    margin-right: auto;
    opacity: ${p => p.active ? '1' : '0'};
    pointer-events: ${p => p.active ? '' : 'none'};
    transform: translate3d(0, -50%, 0);
    z-index: ${LAYERS.alert};
`;

export const StyledAlertTitle = styled.div`
    ${Header2Style}
    color: ${p => p.theme.themeProps.text};
    user-select: none;
`;

export const StyledAlertText = styled(Paragraph)`
    color: ${p => p.theme.themeProps.text};
`;

import { Header2, Header2Style, Header3Style } from "../global/typography";
import styled from "styled-components";
import { LAYERS } from "../global/variables/layers";
import { LinkStyles } from "../global/link.styles";

interface IStyledMessage {
    isActive?: boolean;
}

export const StyledMessage = styled.div<IStyledMessage>`
    position: fixed;
    display: grid;
    grid-template-columns: 25px repeat(4, 1fr) 25px;
    grid-template-rows: 1fr;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;
    bottom: 0;
    width: 100vw;
    opacity: ${p => p.isActive ? '1' : '0'};
    pointer-events: ${p => p.isActive ? '' : 'none'};
    background: ${p => p.theme.themeProps.tertiaryPartialOpacity};
    backdrop-filter: blur(15px);
    color: ${p => p.theme.themeProps.text};
    z-index: ${LAYERS.message};
`;

export const StyledMessageContent = styled(Header2)`
    grid-column: 2 / span 3;
    grid-row: 1;

    a {
        ${LinkStyles};
    }
`;

export const StyledMessageClose = styled.div`
    grid-column: 5 / span 1;
    margin-top: auto;
    margin-bottom: auto;
    align-self: right;
    justify-self: right;
    cursor: pointer;
    mix-blend-mode: difference;
    user-select: none;
`;
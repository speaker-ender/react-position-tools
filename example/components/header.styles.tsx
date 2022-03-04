import { Header2, Header2Style, Header3Style } from "../global/typography";
import styled from "styled-components";
import { LAYERS } from "../global/variables/layers";
import { LinkStyles } from "../global/link.styles";

interface IStyledHeader {
}

export const StyledHeader = styled.div<IStyledHeader>`
    position: fixed;
    display: grid;
    grid-template-columns: 25px repeat(4, 1fr) 25px;
    grid-template-rows: 1fr;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;
    top: 0;
    width: 100vw;
    background: ${p => p.theme.themeProps.tertiaryPartialOpacity};
    backdrop-filter: blur(15px);
    color: ${p => p.theme.themeProps.text};
    z-index: ${LAYERS.header};
`;

export const StyledHeaderTitle = styled(Header2)`
    grid-column: 2 / span 2;
    grid-row: 1;
    mix-blend-mode: invert;

    a {
        ${LinkStyles};
    }
`;

export const StyledNavButton = styled.div`
    grid-column: 5 / span 1;
    ${Header2Style}
    margin-top: auto;
    margin-bottom: auto;
    align-self: right;
    justify-self: right;
    cursor: pointer;
    z-index: ${LAYERS.header};
    mix-blend-mode: difference;
    user-select: none;
`;
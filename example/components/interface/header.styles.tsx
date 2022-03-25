import { Header2, Header2Style, Header3Style } from "../../global/typography";
import styled from "styled-components";
import { LAYERS } from "../../global/variables/layers";
import { LinkStyles } from "../../global/link.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";
import { theme } from "../../global/theme.styles";

interface IStyledHeader {
}

export const StyledHeader = styled.div<IStyledHeader>`
    ${InterfaceBackgroundStyles}
    position: sticky;
    display: grid;
    grid-template-columns: 25px repeat(3, 1fr) min-content 25px;
    grid-template-rows: 1fr;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;
    top: 0;
    width: 100%;
    color: ${p => p.theme.themeProps.text};
    box-shadow: ${`0px 2px 6px -4px ${theme.themeProps.backgroundInvertMediumOpacity}`};
    z-index: ${LAYERS.header};
`;

export const StyledHeaderTitle = styled(Header2)`
    grid-column: 2 / span 3;
    grid-row: 1;

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
    user-select: none;
`;
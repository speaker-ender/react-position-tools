import { LinkStyles } from "../global/link.styles";
import { Header3Style } from "../global/typography";
import styled from "styled-components";
import { LAYERS } from "../global/variables/layers";

interface IStyledNavigation {
    open: boolean;
}

export const StyledNavigation = styled.div<IStyledNavigation>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin-top: 100px;
    opacity: ${p => p.open ? '1' : '0'};
    /* background: ${p => p.theme.themeProps.tertiaryPartialOpacity}; */
    /* backdrop-filter: blur(15px); */
    pointer-events: ${p => p.open ? '' : 'none'};
    z-index: ${LAYERS.navigation};
`;

export const StyledNavigationLink = styled.div`
    ${Header3Style}
    display: inline-block;
    width: 100%;

    & a {
        ${LinkStyles}
    }
`;
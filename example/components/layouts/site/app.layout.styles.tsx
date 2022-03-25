import styled from "styled-components";
import { media } from "../../../global/variables/breakpoints";
import { StyledFooter } from "../../interface/footer.styles";
import { StyledHeader } from "../../interface/header.styles";
import { StyledNavigation } from "../../interface/navigation.styles";
import { StyledContentLayout } from "../page/content.layout.styles";


interface IStyledAppLayout {
}

export const StyledAppLayout = styled.div<IStyledAppLayout>`
    display: grid;
    margin-left: auto;
    margin-right: auto;
    min-height: 100vh;
    grid: "header"
        "navigation"
        "content"
        "footer";
    grid-template-columns: 1fr; 
    grid-template-rows: min-content min-content 1fr min-content;
    align-content: center;
    grid-auto-flow: dense;

    & ${StyledHeader} {
        grid-area: header;
    }

    & ${StyledNavigation} {
        grid-area: navigation;
    }

    & ${StyledContentLayout} {
        grid-area: content;
    }

    & ${StyledFooter} {
        grid-area: footer;
    }
`;
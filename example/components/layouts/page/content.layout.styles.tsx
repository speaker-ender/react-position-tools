import styled, { css } from "styled-components";
import { media } from "../../../global/variables/breakpoints";
import { StyledGridItem } from "../../grid.styles";
import Grid from "../../grid";
import { StyledGrid } from "../../grid.styles";
import { StyledContentItem } from "../content/contentItem.styles";


interface IStyledContentLayout {
}

export const ContentLayoutStyles = css<IStyledContentLayout>`

    & > *:not(${StyledGridItem}):not(${StyledContentItem}) {
        grid-column: start-gutter-end / end-gutter-start;

        @media ${media.tablet} {
            grid-column: start-gutter-end / end-gutter-start;
        }

        @media ${media.desktop} {
            grid-column: start-gutter-end / end-gutter-start;
        }
    }
`

export const StyledContentLayout = styled.div<IStyledContentLayout>`

    & ${StyledGrid} {
        ${ContentLayoutStyles}
    }
`;
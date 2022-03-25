import styled, { css } from "styled-components";
import { media } from "../../../global/variables/breakpoints";
import { ContentItemStyles, StyledContentItem } from "./contentItem.styles";

export interface IStyledGrid {
    columnGap?: string,
    rowGap?: string,
}

export const TwoColumnStyles = css<IStyledGrid>`
    display: grid;
    grid-template-columns: [col-start] 1fr [col-end];
    column-gap: ${p => p.columnGap ? p.columnGap : p.theme.spacingProps.defaultSpacing};
    row-gap: ${p => p.rowGap ? p.rowGap : p.theme.spacingProps.defaultSpacing};
    align-content: center;
    grid-auto-flow: dense;


    @media ${media.tablet} {
        grid-template-columns: repeat(2, [col-start] 1fr [col-end]);
    }

    @media ${media.desktop} {
        grid-template-columns: repeat(2, [col-start] 1fr [col-end]);

    }
`;

export const StyledTwoColumns = styled(StyledContentItem) <IStyledGrid>`
    ${TwoColumnStyles}

    & > ${StyledContentItem} {
        grid-column: 1 / span 1;

        @media ${media.tablet} {
            grid-column-start: col-start;
            grid-column-end: span 1;
        }

        &:nth-of-type(2) {
            @media ${media.tablet} {
                grid-column-start: col-start 2;
            }
        }
    }
`;



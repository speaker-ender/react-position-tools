import styled, { css } from "styled-components";
import { media } from "../global/variables/breakpoints";

export interface IStyledGrid {
    columns?: number,
    rows?: number,
    columnGap?: string,
    rowGap?: string,
    width?: string,
    maxWidth?: string,
    gutter?: string,
}

export interface IStyledGridItem {
    colStart?: string,
    colEnd?: string,
    rowStart?: string,
    rowEnd?: string,
    width?: number,
    height?: number,
    gridCol?: string,
}

export const GridItemStyles = css<IStyledGridItem>`
    grid-column: ${p => `span ${p.width ? Math.floor(p.width / 2) : ''} col-end`};
    grid-column-start: ${p => p.colStart ? p.colStart : 'col-start'};
    grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'col-end'};
    /* grid-row: ${p => `span ${p.height}`}; */

    @media ${media.tablet} {
        grid-column: ${p => `span ${p.width ? Math.round(p.width / 2) : ''} col-end`};
        grid-column-start: ${p => p.colStart ? p.colStart : 'col-start'};
        grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'end-gutter-start'};
    }

    @media ${media.desktop} {
        grid-column: ${p => `span ${p.width ? p.width : ''} col-end`};
        grid-column-start: ${p => p.colStart ? p.colStart : 'col-start'};
        grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'col-end'};
    }
`

export const StyledGridItem = styled.div`
    ${GridItemStyles}
`;

export const GridStyles = css<IStyledGrid>`
    display: grid;
    width: ${p => p.width || 'auto'};
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: ${p => p.columns ? `${p.gutter ? `[start-gutter-start]${p.gutter}[start-gutter-end]` : ''}repeat(${Math.floor(p.columns / 2)}, [col-start] 1fr [col-end])${p.gutter ? `[end-gutter-start]${p.gutter}[end-gutter-end]` : ''}` : 'auto'};
    grid-template-rows: ${p => p.rows ? `repeat(${p.rows * 2}, 1fr [row-end])` : 'repeat(auto-fill, [row] auto)'};
    column-gap: ${p => p.columnGap ? p.columnGap : ''};
    row-gap: ${p => p.rowGap ? p.rowGap : p.theme.spacingProps.defaultSpacing};
    align-content: center;
    grid-auto-flow: dense;
    justify-content: space-between;


    @media ${media.tablet} {
        grid-template-columns: ${p => p.columns ? `${p.gutter ? `[start-gutter-start]${p.gutter}[start-gutter-end]` : ''}repeat(${Math.round(p.columns / 2)}, [col-start] 1fr [col-end])${p.gutter ? `[end-gutter-start]${p.gutter}[end-gutter-end]` : ''}` : 'auto'};
    }

    @media ${media.desktop} {
        grid-template-columns: ${p => p.columns ? `${p.gutter ? `[start-gutter-start]${p.gutter}[start-gutter-end]` : ''}repeat(${p.columns}, [col-start] 1fr [col-end])${p.gutter ? `[end-gutter-start]${p.gutter}[end-gutter-end]` : ''}` : 'auto'};
    }
`;

export const StyledGrid = styled.div<IStyledGrid>`
    ${GridStyles}
`;


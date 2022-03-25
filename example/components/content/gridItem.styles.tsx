import { css } from "styled-components";
import { media } from "../../global/variables/breakpoints";

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
    grid-column: ${p => `span ${p.width ? Math.floor(p.width / 2) : ''}`};
    grid-column-start: ${p => p.colStart ? p.colStart : 'start-gutter-end'};
    grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'end-gutter-start'};
    grid-row: ${p => `span ${p.height}`};

    @media ${media.tablet} {
        grid-column: ${p => `span ${p.width ? Math.round(p.width / 2) : ''}`};
        grid-column-start: ${p => p.colStart ? p.colStart : 'start-gutter-end'};
        grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'end-gutter-start'};
    }

    @media ${media.desktop} {
        grid-column: ${p => `span ${p.width ? p.width : ''}`};
        grid-column-start: ${p => p.colStart ? p.colStart : 'start-gutter-end'};
        grid-column-end: ${p => p.colEnd ? p.colEnd : p.width ? `span ${p.width}` : 'end-gutter-start'};
    }
`
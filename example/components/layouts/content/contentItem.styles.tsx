import styled, { css } from "styled-components";

export interface IStyledContentItem {
    fullWidth?: boolean;
}

export const ContentItemStyles = css<IStyledContentItem>`
    grid-column: ${p => p.fullWidth ? 'start-gutter-start / end-gutter-end' : 'start-gutter-end / end-gutter-start'};
`;

export const StyledContentItem = styled.div<IStyledContentItem>`
    ${ContentItemStyles}
`;

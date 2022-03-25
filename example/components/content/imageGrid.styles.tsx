import styled from "styled-components";
import { StyledImage } from "./image.styles";

interface IStyledImageGrid {
    columns?: number,
    rows?: number
}

export const StyledImageGrid = styled.div<IStyledImageGrid>`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    grid-template-rows: repeat(${props => props.rows}, 1fr);;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;

    & ${StyledImage} {
        grid-column: span 1;
        grid-row: span 1;
    }
`;
import styled, { css } from "styled-components";
import { LAYERS } from "../global/variables/layers";
import { StyledImage } from "./image.styles";
import { StyledImageGrid } from "./imageGrid.styles";

interface IStyledCursorImage {

}

export const StyledCursorContainer = styled.div<IStyledCursorImage>`
    & ${StyledImageGrid} {
        min-height: 50vh;
        height: 100%;
    }
`;
import styled from "styled-components";
import { StyledImageGrid } from "../../components/content/imageGrid.styles";

interface IStyledCursorImage {

}

export const StyledCursorContainer = styled.div<IStyledCursorImage>`
    & ${StyledImageGrid} {
        min-height: 50vh;
    }
`;
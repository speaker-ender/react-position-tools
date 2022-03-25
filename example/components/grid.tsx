import * as React from "react";
import { StyledGrid, StyledGridItem } from "./grid.styles";

export interface IGrid {
    columns?: number,
    rows?: number,
    columnGap?: string,
    rowGap?: string,
    width?: string,
    maxWidth?: string,
    gutter?: string,
}

const gridWrapper = (children: React.ReactNode) => {
    let gridIndex = 0;

    return React.Children.map(children, child => {
        console.log(child);
        return <StyledGridItem>{child}</StyledGridItem>
    })
}

const Grid: React.FC<IGrid> = (props) => {

    return (
        <StyledGrid {...props}>
            {props.children}
        </StyledGrid>
    )
}

export default Grid;
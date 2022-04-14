import * as React from "react";
import { ReactNode } from "react";
import { StyledGrid, StyledGridItem } from "./grid.styles";

export interface IGrid {
  columns?: number;
  rows?: number;
  columnGap?: string;
  rowGap?: string;
  width?: string;
  maxWidth?: string;
  gutter?: string;
  children?: ReactNode;
}

const gridWrapper = (children: ReactNode) => {
  let gridIndex = 0;

  return React.Children.map(children, (child) => {
    return <StyledGridItem>{child}</StyledGridItem>;
  });
};

const Grid: React.FC<IGrid> = (props) => {
  return <StyledGrid {...props}>{props.children}</StyledGrid>;
};

export default Grid;

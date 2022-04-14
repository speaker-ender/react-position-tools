import * as React from "react";
import { ReactNode } from "react";
import { ILayoutProps } from "..";
import { StyledOverlayLayout } from "./overlay.layout.styles";

// Overlay Layout

// Desktop
//  _______________________________________
// | Header                                |
// ----------------------------------------
// | Sidebar  |                            |
// |   Nav    |                            |
// |          |        Page Content        |
// |          |                            |
// |          |                            |
// |          |                            |
// |__________|____________________________|
// |    Nav   |          Footer            |
// |___Footer_|____________________________|

// Mobile
//  __________
// |__Header__|
// |  Overlay |
// |___Nav____|
// |          |
// |   Page   |
// |  Content |
// |          |
// |__________|
// |___Footer_|

export interface IOverlayLayout extends ILayoutProps {
  sidebarStyle?: boolean;
  children?: ReactNode;
}

const OverlayLayout: React.FC<IOverlayLayout> = ({
  children,
  sidebarStyle,
}) => {
  return (
    <StyledOverlayLayout sidebarStyle={sidebarStyle}>
      {children}
    </StyledOverlayLayout>
  );
};

export default OverlayLayout;

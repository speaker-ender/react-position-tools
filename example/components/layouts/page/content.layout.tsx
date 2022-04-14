import { hasWindow, scrollTopDistance } from "@speaker-ender/js-measure";
import * as React from "react";
import { ReactNode, useCallback, useEffect } from "react";
import { ILayoutProps } from "..";
import { theme } from "../../../global/theme.styles";
import { useSiteState } from "../../../hooks/useSiteState";
import Grid from "../../grid";
import { StyledContentLayout } from "./content.layout.styles";

// Content Layout

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
// |   Social |          Footer            |
// |___Links__|____________________________|

// Mobile

export interface IContentLayout extends ILayoutProps {
  children?: ReactNode;
}

const ContentLayout: React.FC<IContentLayout> = ({ children }) => {
  const { overlayActive, lockedScroll, setLockedScroll } = useSiteState();

  const lockScreenHeight = useCallback(() => {
    if (document) {
      if (!!overlayActive) {
        const scrollPosiiton = scrollTopDistance();
        setLockedScroll(scrollPosiiton);
        document.documentElement.style.setProperty(
          "top",
          `-${scrollPosiiton}px`
        );
        document.documentElement.classList.add("nav-open");
        hasWindow && window.scrollTo(0, 0);
      } else {
        document.documentElement.style.setProperty("top", `0`);
        document.documentElement.classList.remove("nav-open");
        hasWindow && window.scrollTo(0, lockedScroll);
      }
    }
  }, [overlayActive, setLockedScroll, lockedScroll]);

  useEffect(() => {
    lockScreenHeight();
  }, [overlayActive, lockScreenHeight]);

  return (
    <StyledContentLayout>
      <Grid columns={12} gutter={theme.spacingProps.pageGridGutters}>
        {children}
      </Grid>
    </StyledContentLayout>
  );
};

export default ContentLayout;

import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";
import { useSiteState } from "../../hooks/useSiteState";
import Drawer from "../content/drawer";
import { RawInvertTheme } from "../invertTheme";
import {
  StyledNavGithub,
  StyledNavGithubLink,
  StyledNavigation,
  StyledNavigationContent,
  StyledNavigationContentWrapper,
  StyledNavigationFooter,
  StyledNavigationHeader,
  StyledNavigationLink,
} from "./navigation.styles";

const DynamicInvertTheme = dynamic(() => import("../invertTheme"), {
  ssr: false,
  loading: () => <RawInvertTheme />,
});

const DynamicGithub = dynamic(() => import("../../assets/github.svg"), {
  ssr: false,
});

interface INavigation {
  sidebarStyle?: boolean;
}

const Navigation: React.FC<INavigation> = (props) => {
  const { navOpen } = useSiteState();

  return (
    <StyledNavigation sidebarStyle={props.sidebarStyle} open={navOpen}>
      <StyledNavigationContent sidebarStyle={props.sidebarStyle} open={navOpen}>
        <StyledNavigationContentWrapper>
          <StyledNavigationHeader>Components</StyledNavigationHeader>
          <StyledNavigationLink>
            <Link href={"/components/cursorContextProvider"}>
              CursorContextProvider
            </Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/components/windowContextProvider"}>
              WindowContextProvider
            </Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/components/viewportContextProvider"}>
              ViewportContextProvider
            </Link>
          </StyledNavigationLink>
          <StyledNavigationHeader>Hooks</StyledNavigationHeader>
          <StyledNavigationLink>
            <Link href={"/hooks/useCursorContext"}>useCursorContext</Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/hooks/useCursorTracking"}>useCursorTracking</Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/hooks/useElementTracking"}>useElementTracking</Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/hooks/useWindowContext"}>useWindowContext</Link>
          </StyledNavigationLink>
          <StyledNavigationLink>
            <Link href={"/hooks/useViewportContext"}>useViewportContext</Link>
          </StyledNavigationLink>
          <Drawer title="Demos">
            <StyledNavigationLink>
              <Link href={"/demos/window-context-demo"}>Window Context</Link>
            </StyledNavigationLink>
            <StyledNavigationLink>
              <Link href={"/demos/cursor-demo"}>Cursor</Link>
            </StyledNavigationLink>
            <StyledNavigationLink>
              <Link href={"/demos/tracked-element-demo"}>Tracked Element</Link>
            </StyledNavigationLink>
          </Drawer>
        </StyledNavigationContentWrapper>
        <StyledNavigationFooter sidebarStyle={props.sidebarStyle}>
          <DynamicInvertTheme />
          <StyledNavGithub>
            <DynamicGithub />
            <StyledNavGithubLink
              href={"https://github.com/speaker-ender/react-position-tools"}
              target="_blank"
              rel="noreferrer"
            />
          </StyledNavGithub>
        </StyledNavigationFooter>
      </StyledNavigationContent>
    </StyledNavigation>
  );
};

export default Navigation;

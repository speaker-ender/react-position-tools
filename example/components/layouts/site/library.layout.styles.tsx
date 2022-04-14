import styled from "styled-components";
import { media } from "../../../global/variables/breakpoints";
import { StyledFooter } from "../../interface/footer.styles";
import { StyledHeader } from "../../interface/header.styles";
import { StyledNavigation } from "../../interface/navigation.styles";
import { StyledContentLayout } from "../page/content.layout.styles";

interface IStyledLibrary {}

export const StyledLibrary = styled.div<IStyledLibrary>`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  grid:
    "header header"
    "navigation navigation"
    "content content"
    "footer footer";
  grid-template-rows: min-content min-content 1fr min-content;
  align-content: center;
  grid-auto-flow: dense;

  @media ${media.tablet} {
    grid:
      "header header"
      "navigation content"
      "navigation footer";
    grid-template-columns: 25% 1fr;
    grid-template-rows: min-content 1fr min-content;
  }

  & ${StyledHeader} {
    grid-area: header;
  }

  & ${StyledNavigation} {
    grid-area: navigation;
  }

  & ${StyledContentLayout} {
    grid-area: content;
  }

  & ${StyledFooter} {
    grid-area: footer;
  }
`;

import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { Header2 } from "../global/typography";
import { StyledPage } from "../global/page.styles";
import ParagraphComponent from "../components/content/paragraph";
import CursorParalax from "../components/cursor/cursorParalax";

const Home: NextPage = () => {
  return (
    <StyledPage>
      <Header2>📏 React Position Tools</Header2>
      <StyledPanel>
        <ParagraphComponent text="React Hooks and Contexts for DOM Positions" />
      </StyledPanel>
      <CursorParalax />
    </StyledPage>
  );
};

export default Home;

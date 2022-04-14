import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { Header2 } from "../global/typography";
import { StyledPage } from "../global/page.styles";
import ParagraphComponent from "../components/content/paragraph";

const Home: NextPage = () => {
  return (
    <StyledPage>
      <Header2>React Position Tools</Header2>
      <StyledPanel>
        <ParagraphComponent text="React Hooks and Contexts for DOM Positions" />
      </StyledPanel>
    </StyledPage>
  );
};

export default Home;

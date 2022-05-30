import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { Header2, Header3 } from "../global/typography";
import { StyledPage } from "../global/page.styles";
import ParagraphComponent from "../components/content/paragraph";
import CursorParalax from "../components/cursor/cursorParalax";

const Home: NextPage = () => {
  return (
    <StyledPage>
      <Header2>📏 React Position Tools</Header2>
      <StyledPanel>
        <ParagraphComponent text="Contexts and Hooks for tracking the position of everything in the DOM including:" />
        <ParagraphComponent text="Window Size, Elements Positions, and Cursor Position" />
      </StyledPanel>
      <Header3>Example Usage</Header3>
      <StyledPanel>
        <ParagraphComponent text="Here you can see the useCursorTracking hook being used to animate a card while moving a cursor over it." />
      </StyledPanel>
      <CursorParalax />
      <StyledPanel>
        <ParagraphComponent text="While not required, it is recommended to use a library such as React-Spring to apply any animations you wish to trigger from event callbacks." />
        <ParagraphComponent text="Constantly writing to the DOM via React (or any other method) can degrade performance of your site." />
        <ParagraphComponent text="Simply using CSS transitions and animations can also be costly if they are not written with care." />
      </StyledPanel>
    </StyledPage>
  );
};

export default Home;

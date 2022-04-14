import type { NextPage } from "next";
import { StyledPanel } from "../../global/panel.styles";
import { Header2 } from "../../global/typography";
import { StyledPage } from "../../global/page.styles";
import WindowInfo from "../../components/window/windowInfo";

const WindowContextDemo: NextPage = () => {
  return (
    <StyledPage>
      <Header2>Window Context Demo</Header2>
      <StyledPanel>
        <WindowInfo />
      </StyledPanel>
    </StyledPage>
  );
};

export default WindowContextDemo;

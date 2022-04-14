import type { NextPage } from "next";
import { StyledPanel } from "../global/panel.styles";
import { Header2, Header3, Header4 } from "../global/typography";
import { StyledPage } from "../global/page.styles";

const Custom404: NextPage = () => {
  return (
    <StyledPage>
      <Header2>404</Header2>
      <StyledPanel>
        <Header3>Are You Lost?</Header3>
      </StyledPanel>
    </StyledPage>
  );
};

export default Custom404;

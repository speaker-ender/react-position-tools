import * as React from "react";
import { ReactNode } from "react";
import PageTransition from "../../../global/pageTransition";
import { useSiteState } from "../../../hooks/useSiteState";
import Footer from "../../interface/footer";
import Header from "../../interface/header";
import Navigation from "../../interface/navigation";
import ContentLayout from "../page/content.layout";
import { StyledAppLayout } from "./app.layout.styles";

// App Layout
//  _______________________________________
// | Header                                |
// ----------------------------------------
// |                                       |
// |            Page Content               |
// |                                       |
// |                                       |
// |                                       |
// |                                       |
// |_______________________________________|
// |               Footer                  |
// |_______________________________________|

interface IAppLayout {
  children?: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = (props) => {
  const { overlayActive } = useSiteState();

  return (
    <StyledAppLayout>
      <Header />
      <Navigation />
      <PageTransition>
        <ContentLayout>{props.children}</ContentLayout>
      </PageTransition>
      <Footer />
    </StyledAppLayout>
  );
};

export default AppLayout;

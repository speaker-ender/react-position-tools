import * as React from "react";
import { ILayoutProps } from "..";
import PageTransition from "../../../global/pageTransition";
import { useSiteState } from "../../../hooks/useSiteState";
import Footer from "../../interface/footer";
import Header from "../../interface/header";
import Navigation from "../../interface/navigation";
import ContentLayout from "../page/content.layout";
import { StyledLibrary } from "./library.layout.styles";

// Libary Layout

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


export interface ILibraryLayout extends ILayoutProps { }


const LibraryLayout: React.FC<ILayoutProps> = ({ children }) => {
    const { overlayActive } = useSiteState();

    return (
        <StyledLibrary>
            <Header />
            <Navigation sidebarStyle={true} />
            <PageTransition>
                <ContentLayout>
                    {children}
                </ContentLayout>
            </PageTransition>
            <Footer />
        </StyledLibrary>
    )
}

export default LibraryLayout;

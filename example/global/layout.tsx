import * as React from "react";
import Head from 'next/head';
import Header from "../components/header";
import Navigation from "../components/navigation";
import { StyledPage } from "./page.styles";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.styles";
import { GlobalStyle } from "./global.styles";
import InvertTheme from "../components/invertTheme";
import { useSiteState } from "../hooks/useSiteState";
import Overlay from "../components/overlay";
import Alert from "../components/alert";
import Message from "../components/message";
import { WindowContextProvider } from '../../src/index';
import { ScrollContextProvider } from "@speaker-ender/react-scrollr";
import { CursorContextProvider } from "../../src/cursor.context";


const Layout: React.FC = ({ children }) => {
    const { themeInverted } = useSiteState();

    return (
        <ScrollContextProvider>
            <ThemeProvider theme={{ ...theme, isInvert: themeInverted }}>
                <WindowContextProvider>
                    <CursorContextProvider>
                        <div className="container">
                            <GlobalStyle />
                            <Head>
                                <title>Next.JS Starter</title>
                                <link rel="icon" href="/favicon.ico" />
                            </Head>
                            <main>
                                <Header />
                                <Navigation />
                                <StyledPage>
                                    {children}
                                </StyledPage>
                            </main>
                            <Overlay />
                            <Alert />
                            <InvertTheme />
                            <Message />
                        </div>
                    </CursorContextProvider>
                </WindowContextProvider>
            </ThemeProvider>
        </ScrollContextProvider>
    )
}

export default Layout;
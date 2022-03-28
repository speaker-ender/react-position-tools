import * as React from "react";
import Head from 'next/head';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.styles";
import { GlobalStyle } from "./global.styles";
import { useSiteState } from "../hooks/useSiteState";
import Overlay from "../components/overlay";
import LibraryLayout from "../components/layouts/site/library.layout";
import OverlayLayout from "../components/layouts/site/overlay.layout";
import DebugPanel from "../components/interface/debugPanel";
import { useSiteRoutes } from "../hooks/useSiteRoutes";
import dynamic from "next/dynamic";
import { StyledNotificationTray, StyledNotificationWrapper } from "../components/interface/notificationTray.styles";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import WindowInfo from "../components/window/windowInfo";
import { ScrollContextProvider } from "@speaker-ender/react-scrollr";
import { CursorContextProvider, WindowContextProvider } from "@speaker-ender/react-position-tools";

const DynamicBannerMessage = dynamic(() => import('../components/interface/bannerMessage'), {
    ssr: false,
});

const DynamicNotificationTray = dynamic(() => import('../components/interface/notificationTray'), {
    ssr: false,
    loading: () => <StyledNotificationTray><StyledNotificationWrapper /></StyledNotificationTray>
});

const Layout: React.FC = ({ children }) => {
    const isClient = useClientHook();
    const { themeStyle, setThemeStyle } = useSiteState();
    useSiteRoutes();

    React.useEffect(() => {
        if (!!isClient) {
            const root = window.document.documentElement;
            const initialColorValue = root.style.getPropertyValue(
                '--initial-color-mode'
            );

            !!initialColorValue && setThemeStyle(initialColorValue);
        }
    }, [isClient]);

    return (
        <>
            <ThemeProvider theme={{ ...theme, themeStyle: themeStyle }}>
                <style jsx global>
                    {`
                    @font-face {
                        font-family: "Orbitron";
                        src: url("/fonts/Orbitron-Medium.ttf") format('truetype');
                        font-style: normal;
                        font-weight: 400;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: "OrbitronBold";
                        src: url("/fonts/Orbitron-Black.ttf") format('truetype');
                        font-style: normal;
                        font-weight: 600;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: "WorkSans";
                        src: url("/fonts/WorkSans-Medium.ttf") format('truetype');
                        font-style: bold;
                        font-weight: 400;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: "WorkSansBold";
                        src: url("/fonts/WorkSans-Bold.ttf") format('truetype');
                        font-style: bold;
                        font-weight: 600;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: "SourceCodePro";
                        src: url("/fonts/SourceCodePro-Regular.ttf") format('truetype');
                        font-style: bold;
                        font-weight: 400;
                        font-display: swap;
                    }
                    @font-face {
                        font-family: "SourceCodeProBold";
                        src: url("/fonts/SourceCodePro-SemiBold.ttf") format('truetype');
                        font-style: bold;
                        font-weight: 600;
                        font-display: swap;
                    }
                    `}
                </style>
                <GlobalStyle />
                <Head>
                    <title>React Position Tools</title>
                    <link rel="icon" href="/logo.svg" />
                    <link
                        rel="preload"
                        href="/fonts/Orbitron-Medium.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Orbitron-Black.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/WorkSans-Medium.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/WorkSans-Regular.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/SourceCodePro-Regular.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/SourceCodePro-SemiBold.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin=""
                    />
                    <meta name='viewport' content='initial-scale=1, viewport-fit=cover'></meta>
                </Head>
                <ScrollContextProvider>
                    <WindowContextProvider>
                        <CursorContextProvider>
                            <main>
                                <LibraryLayout>
                                    {children}
                                </LibraryLayout>
                            </main>
                            <OverlayLayout sidebarStyle={true}>
                                <DebugPanel>
                                    <WindowInfo />
                                </DebugPanel>
                                <DynamicNotificationTray />
                                <DynamicBannerMessage />
                                <Overlay />
                            </OverlayLayout>
                        </CursorContextProvider>
                    </WindowContextProvider>
                </ScrollContextProvider>
            </ThemeProvider>
        </>
    )
}

export default Layout;
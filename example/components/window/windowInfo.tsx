import { useCallback, useEffect, useState } from "react";
import { useWindowContext } from "@speaker-ender/react-position-tools";
import { IWindowDimensions } from "@speaker-ender/react-position-tools/dist/window.context";
import { Header4 } from "../../global/typography";
import ParagraphComponent from "../content/paragraph";


const WindowInfo: React.FC = (props) => {
    const { registerResizeCallback, unregisterResizeCallback, windowDimensions } = useWindowContext();
    const [windowState, setWindowState] = useState<IWindowDimensions>();

    const resizeCallback = useCallback((newHeight: number, newWidth: number) => {
        !!newWidth && setWindowState({ height: newHeight, width: newWidth });
    }, [setWindowState])

    useEffect(() => {
        registerResizeCallback && registerResizeCallback(resizeCallback);
        windowDimensions && setWindowState(windowDimensions.current);

        return () => {
            unregisterResizeCallback && unregisterResizeCallback(resizeCallback);
        };
    }, []);

    return (
        <>
            <Header4>Window Properties</Header4>
            <ParagraphComponent text={`WindowWidth: ${windowState && windowState.width}px`} />
            <ParagraphComponent text={`WindowHeight: ${windowState && windowState.height}px`} />
        </>
    )
}

export default WindowInfo
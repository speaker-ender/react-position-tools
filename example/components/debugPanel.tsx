import * as React from "react"
import { useToggle } from "../hooks/useToggle";
import { StyledDebugCloseButton, StyledDebugContent, StyledDebugPanel } from "./debugPanel.styles";

export interface IDebugPanel {
    defaultOpen?: boolean;
    children?: React.ReactNode;
}

const DebugPanel: React.FC<IDebugPanel> = (props) => {
    const { isToggled, updateToggled } = useToggle({ initialState: props.defaultOpen });

    return (
        <StyledDebugPanel open={!!isToggled}>
            <StyledDebugCloseButton onClick={() => updateToggled()}>{!!isToggled ? '❌' : '🐞'}</StyledDebugCloseButton>
            <StyledDebugContent open={!!isToggled}>
                {props.children}
            </StyledDebugContent>
        </StyledDebugPanel>
    )
}

export default DebugPanel

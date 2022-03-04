import * as React from "react"
import { useToggle } from "../hooks/useToggle";
import { StyledDrawer, StyledDrawerContent, StyledDrawerTitle } from "./drawer.styles";

export interface IDrawer {
    title?: string;
    defaultOpen?: boolean;
    children?: React.ReactChild;
}

const Drawer: React.FC<IDrawer> = (props) => {
    const { isToggled, updateToggled } = useToggle({ initialState: props.defaultOpen });

    return (
        <StyledDrawer open={!!isToggled}>
            <StyledDrawerTitle open={!!isToggled} onClick={() => updateToggled()}>{props.title}</StyledDrawerTitle>

            <StyledDrawerContent open={!!isToggled}>
                {props.children}
            </StyledDrawerContent>
        </StyledDrawer>
    )
}

export default Drawer

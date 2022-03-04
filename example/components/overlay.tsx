import * as React from "react"
import { useSiteState } from "../hooks/useSiteState";
import { StyledOverlay } from "./overlay.styles";

export interface IAlert {
    title?: string;
    children?: React.ReactChild[] | React.ReactElement;
    text?: string;
}

const Overlay: React.FC<IAlert> = (props) => {
    const { overlayActive } = useSiteState();

    return (
        <StyledOverlay isActive={!!overlayActive}>
        </StyledOverlay>
    )
}

export default Overlay

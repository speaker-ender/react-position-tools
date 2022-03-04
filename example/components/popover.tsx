import * as React from "react"
import { useToggle } from "../hooks/useToggle";
import { StyledPopover, StyledPopoverCloseButton, StyledPopoverContent, StyledPopoverIcon } from "./popover.styles";

export interface IPopover {
    title?: string;
    defaultOpen?: boolean;
    children?: React.ReactChild[] | React.ReactElement;
    text?: string;
}

const Popover: React.FC<IPopover> = (props) => {
    const { isToggled, updateToggled } = useToggle({ initialState: props.defaultOpen });

    return (
        <StyledPopover open={!!isToggled}>
            {props.children}
            <StyledPopoverIcon onClick={() => updateToggled()}>❔</StyledPopoverIcon>
            <StyledPopoverContent open={!!isToggled}>
                <StyledPopoverCloseButton onClick={() => updateToggled()}>X</StyledPopoverCloseButton>
                <div dangerouslySetInnerHTML={{ __html: props.text || '' }}></div>
            </StyledPopoverContent>
        </StyledPopover>
    )
}

export default Popover

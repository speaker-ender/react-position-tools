import * as React from "react";
import { IStyledContentItem } from "../layouts/content/contentItem.styles";
import { StyledParagraphContent } from "./paragraph.styles";

interface IParagraphComponent extends IStyledContentItem {
    text?: string;
}

const ParagraphComponent: React.FC<IParagraphComponent> = (props) => {

    return (
        <StyledParagraphContent {...props}>
            <p dangerouslySetInnerHTML={{ __html: props.text || '' }} />
        </StyledParagraphContent>
    )
}

export default ParagraphComponent;
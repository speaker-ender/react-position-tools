import styled from "styled-components";
import { ParagraphTextStyle } from "../../global/typography";
import { StyledContentItem } from "../layouts/content/contentItem.styles";

export const StyledParagraphContent = styled(StyledContentItem)`
    color: ${p => p.theme.themeProps.text};

     & p {
        ${ParagraphTextStyle}
     }
`
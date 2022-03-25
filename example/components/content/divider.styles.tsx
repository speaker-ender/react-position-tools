import styled from "styled-components";
import { InvertContentBackgroundStyles } from "../../global/background.styles";
import { theme } from "../../global/theme.styles";
import { StyledContentItem } from "../layouts/content/contentItem.styles";

export const StyledDivider = styled(StyledContentItem)`
    ${InvertContentBackgroundStyles}
    width: 100%;
    height: 2px;
`
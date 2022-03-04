import styled, { css } from "styled-components";
import { FONTS } from "./typography";

export const LinkStyles = css`
    color: ${p => p.theme.themeProps.primary};
    text-decoration: none;

    &:hover {
        color: ${p => p.theme.themeProps.primaryLight};
    }
`

export const StyledLink = styled.div`
    display: inline;
    font-family: ${FONTS.mainBold};
    a {
        ${LinkStyles};
    }
`
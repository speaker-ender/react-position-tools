import styled, { css } from "styled-components";
import { InvertContentBackgroundStyles } from "./background.styles";
import { theme } from "./theme.styles";

export const FONTS = {
    main: `"Orbitron", "Arial Black", Arial, Helvetica, sans-serif`,
    mainBold: `"OrbitronBold", "Arial Black", Arial, Helvetica, sans-serif`,
    secondary: `"WorkSans", "Arial Black", Arial, Helvetica, sans-serif`,
    secondaryBold: `"WorkSansBold", "Arial Black", Arial, Helvetica, sans-serif`,
    code: `"SourceCodePro", "Arial Black", Arial, Helvetica, sans-serif`,
    codeBold: `"SourceCodeProBold", "Arial Black", Arial, Helvetica, sans-serif`
};

export const Header1Style = css`
    font-family: ${FONTS.mainBold};
    font-size: 4rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    overflow-wrap: break-word;
`

export const Header1 = styled.h1`
    ${Header1Style};
    color: ${p => p.theme.themeProps.text};
`;

export const Header2Style = css`
    font-family: ${FONTS.main};
    font-size: 2.5rem;
    text-transform: uppercase;
    overflow-wrap: break-word;
`

export const Header2 = styled.h2`
    ${Header2Style};
    color: ${p => p.theme.themeProps.text};
`;

export const Header3Style = css`
    font-family: ${FONTS.mainBold};
    font-size: 1.5rem;
    text-transform: uppercase;
    overflow-wrap: break-word;
`

export const Header3 = styled.h3`
    ${Header3Style};
    color: ${p => p.theme.themeProps.text};
`;

export const Header4Style = css`
    font-family: ${FONTS.mainBold};
    font-size: 1.5rem;
    overflow-wrap: break-word;
`

export const Header4 = styled.h4`
    ${Header4Style};
    color: ${p => p.theme.themeProps.text};
`;

export const Header5Style = css`
    font-family: ${FONTS.mainBold};
    font-size: 0.8rem;
    overflow-wrap: break-word;
`

export const Header5 = styled.h5`
    ${Header5Style};
    color: ${p => p.theme.themeProps.text};
`;

export const ParagraphTextStyle = css`
    font-family: ${FONTS.secondary};
    font-size: 1rem;
`

export const Paragraph = styled.p`
    ${ParagraphTextStyle}
    color: ${p => p.theme.themeProps.text};
`

export const CodeTextStyle = css`
    font-family: ${FONTS.codeBold};
    font-size: 0.8rem; 
    color: ${theme.themeProps.primary};
`

export const StyledCodeHeader = styled.span`
    font-family: ${FONTS.codeBold};
    text-transform: none;
`

export const StyledCodeProperty = styled.span`
    color: ${theme.themeProps.secondaryLightMediumOpacity};
`

export const StyledCodePropertyType = styled.span`
    color: ${theme.themeProps.primaryDark};
`

export const StyledCode = styled.div`
    ${InvertContentBackgroundStyles}
    ${CodeTextStyle}
    padding: ${theme.spacingProps.defaultSpacing};
`

export const SmallTextStyle = css`
    font-family: ${FONTS.secondary};
    font-size: 0.6rem; 
`

export const NavigationTextStyle = css`
    font-family: ${FONTS.main};
    font-size: 2rem;
    overflow-wrap: break-word;
`

export const NavigationSubPageTextStyle = css`
    font-family: ${FONTS.main};
    font-size: 1rem;
`

export const StyledLabel = styled.label`
    font-family: ${FONTS.secondary};
    font-size: 0;
    width: 0px;
    height: 0px;
`

export const StyledVisibleLabel = styled.label`
    ${SmallTextStyle}
`

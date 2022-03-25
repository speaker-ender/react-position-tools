import { Header2, Header2Style, Header3Style } from "../../global/typography";
import styled from "styled-components";
import { LAYERS } from "../../global/variables/layers";
import { LinkStyles } from "../../global/link.styles";
import { transition } from "../../global/animation.styles";
import { InterfaceBackgroundStyles } from "../../global/background.styles";
import { theme } from "../../global/theme.styles";

interface IStyledMessage {
    isActive?: boolean;
}

export const StyledBannerMessage = styled.div<IStyledMessage>`
    ${InterfaceBackgroundStyles}
    display: grid;
    grid-template-columns: 25px repeat(4, 1fr) 25px;
    grid-template-rows: 1fr;
    column-gap: 25px;
    row-gap: 25px;
    align-content: center;
    bottom: 0;
    width: 100vw;
    max-height: ${p => p.isActive ? '140px' : '0px'};
    opacity: ${p => p.isActive ? '1' : '0'};
    pointer-events: ${p => p.isActive ? 'all' : 'none'};
    backdrop-filter: ${p => p.isActive ? `` : 'blur(0px)'};
    color: ${p => p.theme.themeProps.text};
    box-shadow: ${`0px -2px 6px -4px ${theme.themeProps.backgroundInvertMediumOpacity}`};
    transition: max-height ${transition.appear}, opacity ${transition.appear}, backdrop-filter ${transition.appear};
    z-index: ${LAYERS.message};
`;

export const StyledBannerMessageContent = styled(Header2)`
    grid-column: 2 / span 3;
    grid-row: 1;

    a {
        ${LinkStyles};
    }
`;

export const StyledBannerMessageClose = styled.div`
    grid-column: 5 / span 1;
    margin-top: auto;
    margin-bottom: auto;
    align-self: right;
    justify-self: right;
    cursor: pointer;
    mix-blend-mode: difference;
    user-select: none;
`;
import { Header2Style } from "../../global/typography";
import styled from "styled-components";
import { transition } from "../../global/animation.styles";
import { LinkStyles } from "../../global/link.styles";

interface IStyledDrawer {
    open: boolean;
}

export const StyledDrawer = styled.div<IStyledDrawer>`
`;

export const StyledDrawerTitle = styled.div<IStyledDrawer>`
`;

export const StyledDrawerHeader = styled.div<IStyledDrawer>`
    ${LinkStyles}
    ${Header2Style}
    display: grid;
    grid-template-columns: 1fr min-content;
    align-items: center;
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;
    user-select: none;
`;

export const StyledDrawerIcon = styled.div<IStyledDrawer>`
    ${LinkStyles}
    ${Header2Style}
    color: ${p => p.theme.themeProps.text};
    cursor: pointer;
    user-select: none;
`;

export const StyledDrawerContentWrapper = styled.div<IStyledDrawer>`
    opacity: ${p => p.open ? 1 : 0};
    max-height: 0px;
    pointer-events: ${p => p.open ? "all" : "none"};
    overflow: hidden;
    transition: max-height ${transition.appearSecondary}, opacity ${transition.appear};
`;

export const StyledDrawerContent = styled.div<IStyledDrawer>`
    padding: ${p => p.theme.spacingProps.defaultSpacing};
    pointer-events: ${p => p.open ? "all" : "none"};
`;
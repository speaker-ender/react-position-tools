import styled, { css } from "styled-components";

interface IStyledPanel {
}

export const PanelStyles = css`
        padding: 25px 50px;
        margin-bottom: 25px;
        background: ${p => p.theme.themeProps.tertiaryPartialOpacity};
        border-radius: ${p => p.theme.rounding.borderRadius};
        box-shadow: ${p => `0px 0px 10px ${p.theme.themeProps.backgroundInvertMediumOpacity}`};
        backdrop-filter: blur(15px);
`;

export const StyledPanel = styled.div<IStyledPanel>`
        ${PanelStyles};
`;
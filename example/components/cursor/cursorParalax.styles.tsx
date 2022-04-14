import styled, { css } from "styled-components";
import { Paragraph } from "../../global/typography";
import { StyledImage } from "../content/image.styles";

interface IStyledCursorImage {
  wireframe?: boolean;
  isHover?: boolean;
}

export const StyledCursorImage = css<IStyledCursorImage>`
  position: relative;
  height: 100%;
  backface-visibility: hidden;
  perspective-origin: center center;
  transform-style: preserve-3d;
  background-size: 400% 400%;
  transform: scale(1) translate3d(0, -2px, 0);
  transition: background-position 500ms cubic-bezier(0.215, 0.61, 0.355, 1),
    background-color 250ms cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    box-shadow 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: ${(p) =>
    p.isHover
      ? `5px 5px 6px -4px ${p.theme.themeProps.backgroundInvert}`
      : `0px 0px 6px -4px ${p.theme.themeProps.backgroundInvert}`};
  outline: solid
    ${(p) => (p.wireframe ? `${p.theme.themeProps.secondary}5px` : "none")};

  & span {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

export const StyledCursorParalaxWrapper = styled.div<IStyledCursorImage>`
  display: grid;
  height: 100%;
  width: 100%;
  perspective: 600px;
  perspective-origin: center center;
  grid-template-columns: 5% 1fr 5%;
  align-items: center;
  outline: solid
    ${(p) => (p.wireframe ? `${p.theme.themeProps.primary}5px` : "none")};
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    box-shadow 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

export const StyledCursorParalax = styled.div<IStyledCursorImage>`
  grid-column: 2 / 3;
  height: 100%;
  perspective-origin: center center;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    box-shadow 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  perspective: 300;
  position: relative;
  outline: solid
    ${(p) => (p.wireframe ? `${p.theme.themeProps.primary}5px` : "none")};

  & ${StyledImage} {
    ${StyledCursorImage}
  }

  & ${Paragraph} {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 22;
    color: ${(p) => p.theme.themeProps.text};
    text-shadow: 0px 0px 10px ${(p) => p.theme.themeProps.textInvert};
    transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
      box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: scale(1) translate3d(-100%, -100%, 100px);
  }
`;

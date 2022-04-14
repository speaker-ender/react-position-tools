import styled from "styled-components";

interface IStyledImage {
  coloredBackground?: boolean;
}

export const StyledImage = styled.div<IStyledImage>`
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: invert();
  background: ${(p) =>
    p.coloredBackground
      ? `linear-gradient(-45deg, ${p.theme.themeProps.primaryLight}, ${p.theme.themeProps.primaryDark}, ${p.theme.themeProps.secondaryLight}, ${p.theme.themeProps.secondaryDark})`
      : "white"};
  transition: background 400ms ease-in-out;
`;

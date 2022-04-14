import * as React from "react";
import { useSiteState } from "../hooks/useSiteState";
import { StyledInvertThemeButton } from "./invertTheme.styles";
import { Suspense } from "react";
import LightDark from "../assets/lightDark";

export interface IInvertTheme {
  themeStyle?: string;
}

export const RawInvertTheme: React.FC<IInvertTheme> = ({ themeStyle }) => {
  const { setThemeStyle } = useSiteState();

  return (
    <StyledInvertThemeButton
      themeStyle={themeStyle || undefined}
      onClick={() => setThemeStyle(themeStyle === "light" ? "dark" : "light")}
    >
      <LightDark />
    </StyledInvertThemeButton>
  );
};

const InvertTheme: React.FC<IInvertTheme> = () => {
  const { themeStyle } = useSiteState();

  return (
    <Suspense
      fallback={
        <StyledInvertThemeButton
          themeStyle={undefined}
        ></StyledInvertThemeButton>
      }
    >
      <RawInvertTheme themeStyle={themeStyle} />
    </Suspense>
  );
};

export default InvertTheme;

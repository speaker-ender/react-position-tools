import { css } from "styled-components";
import { colorFactory } from "./variables/colors";
import { OPACITY } from "./variables/opacity";

export interface ITheme {
  text: string;
  textInvert: string;
  background: string;
  backgroundInvert: string;
  backgroundInvertMediumOpacity: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  tertiary: string;
  tertiaryPartialOpacity: string;
  tertiaryMediumOpacity: string;
  tertiaryHalfOpacity: string;
  tertiaryLight: string;
  tertiaryDark: string;
}

export class ThemeClass implements ITheme {
  text: string = "";
  textInvert: string = "";
  background: string = "";
  backgroundInvert: string = "";
  backgroundInvertMediumOpacity: string = "";
  primary: string = "";
  primaryLight: string = "";
  primaryDark: string = "";
  secondary: string = "";
  secondaryLight: string = "";
  secondaryDark: string = "";
  tertiary: string = "";
  tertiaryPartialOpacity: string = "";
  tertiaryMediumOpacity: string = "";
  tertiaryHalfOpacity: string = "";
  tertiaryLight: string = "";
  tertiaryDark: string = "";
}

export const getThemeProps = () => {
  return (Object.keys(new ThemeClass()) as (keyof ThemeClass)[]).reduce((themeObj, themeProp) => {
    themeObj[themeProp] = `var(--${themeProp})`;
    return themeObj;
  }, {} as ITheme);
}

export const theme = {
  colors: {
    ...colorFactory()
  },
  themeProps: {
    ...getThemeProps()
  },
  isInvert: false,
  rounding: {
    borderRadius: '25px',
  },
  backgroundStyle: {
    opacity: OPACITY.partial,
    blur: '15px',
  }
};

export type ThemeType = typeof theme;


export const LIGHT_THEME: ITheme = {
  'text': theme.colors.black.noneOpacity,
  'textInvert': theme.colors.white.noneOpacity,
  'background': theme.colors.white.noneOpacity,
  'backgroundInvert': theme.colors.black.noneOpacity,
  'backgroundInvertMediumOpacity': theme.colors.black.mediumOpacity,
  'primary': theme.colors.skyBlue.noneOpacity,
  'primaryLight': theme.colors.skyBlueLight.noneOpacity,
  'primaryDark': theme.colors.skyBlueDark.noneOpacity,
  'secondary': theme.colors.gold.noneOpacity,
  'secondaryLight': theme.colors.goldLight.noneOpacity,
  'secondaryDark': theme.colors.goldDark.noneOpacity,
  'tertiary': theme.colors.sand.noneOpacity,
  'tertiaryPartialOpacity': theme.colors.sand.partialOpacity,
  'tertiaryMediumOpacity': theme.colors.sand.mediumOpacity,
  'tertiaryHalfOpacity': theme.colors.sand.halfOpacity,
  'tertiaryLight': theme.colors.sandLight.noneOpacity,
  'tertiaryDark': theme.colors.sandDark.noneOpacity
}

export const DARK_THEME: ITheme = {
  'text': theme.colors.white.noneOpacity,
  'textInvert': theme.colors.black.noneOpacity,
  'background': theme.colors.black.noneOpacity,
  'backgroundInvert': theme.colors.white.noneOpacity,
  'backgroundInvertMediumOpacity': theme.colors.white.mediumOpacity,
  'primary': theme.colors.blood.noneOpacity,
  'primaryLight': theme.colors.bloodLight.noneOpacity,
  'primaryDark': theme.colors.bloodDark.noneOpacity,
  'secondary': theme.colors.green.noneOpacity,
  'secondaryLight': theme.colors.greenLight.noneOpacity,
  'secondaryDark': theme.colors.greenDark.noneOpacity,
  'tertiary': theme.colors.dust.noneOpacity,
  'tertiaryPartialOpacity': theme.colors.dust.partialOpacity,
  'tertiaryMediumOpacity': theme.colors.dust.mediumOpacity,
  'tertiaryHalfOpacity': theme.colors.dust.halfOpacity,
  'tertiaryLight': theme.colors.dust.noneOpacity,
  'tertiaryDark': theme.colors.dust.noneOpacity
}

export const getThemePropsString = (themeObject: ITheme) => {
  return (Object.keys(themeObject) as (keyof ITheme)[]).reduce((themeString, current) => {
    return themeString += `--${current}: ${themeObject[current]};`;
  }, '');
}

export const lightThemeProps = css`${getThemePropsString(LIGHT_THEME)}`;

export const darkThemeProps = css`${getThemePropsString(DARK_THEME)}`;

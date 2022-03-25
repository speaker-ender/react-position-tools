import { css } from "styled-components";
import { colorFactory } from "./variables/colors";
import { OPACITY } from "./variables/opacity";
import { getSpacingThemeProps } from "./variables/spacing";

export interface ITheme {
  text: string;
  textInvert: string;
  background: string;
  backgroundMediumOpacity: string;
  backgroundHalfOpacity: string;
  contentBackground: string;
  contentBackgroundMediumOpacity: string;
  contentBackgroundHalfOpacity: string;
  interfaceBackground: string;
  interfaceBackgroundMediumOpacity: string;
  interfaceBackgroundHalfOpacity: string;
  backgroundInvert: string;
  backgroundInvertMediumOpacity: string;
  primary: string;
  primaryHalfOpacity: string;
  primaryHighOpacity: string;
  primaryLight: string;
  primaryLightHalfOpacity: string;
  primaryLightMostOpacity: string;
  primaryDark: string;
  primaryDarkHalfOpacity: string;
  secondary: string;
  secondaryMediumOpacity: string;
  secondaryPartialOpacity: string;
  secondaryLight: string;
  secondaryLightMediumOpacity: string;
  secondaryDark: string;
  secondaryDarkMediumOpacity: string;
  tertiary: string;
  tertiaryPartialOpacity: string;
  tertiaryMediumOpacity: string;
  tertiaryHalfOpacity: string;
  tertiaryLight: string;
  tertiaryDark: string;
  highlight: string;
}

export class ThemeClass implements ITheme {
  text: string = "";
  textInvert: string = "";
  background: string = "";
  backgroundMediumOpacity: string = "";
  backgroundHalfOpacity: string = "";
  contentBackground: string = "";
  contentBackgroundMediumOpacity: string = "";
  contentBackgroundHalfOpacity: string = "";
  interfaceBackground: string = "";
  interfaceBackgroundMediumOpacity: string = "";
  interfaceBackgroundHalfOpacity: string = "";
  backgroundInvert: string = "";
  backgroundInvertMediumOpacity: string = "";
  primary: string = "";
  primaryHalfOpacity: string = "";
  primaryHighOpacity: string = "";
  primaryLight: string = "";
  primaryLightHalfOpacity: string = "";
  primaryLightMostOpacity: string = "";
  primaryDark: string = "";
  primaryDarkHalfOpacity: string = "";
  secondary: string = "";
  secondaryMediumOpacity: string = "";
  secondaryPartialOpacity: string = "";
  secondaryLight: string = "";
  secondaryLightMediumOpacity: string = "";
  secondaryDark: string = "";
  secondaryDarkMediumOpacity: string = "";
  tertiary: string = "";
  tertiaryPartialOpacity: string = "";
  tertiaryMediumOpacity: string = "";
  tertiaryHalfOpacity: string = "";
  tertiaryLight: string = "";
  tertiaryDark: string = "";
  highlight: string = "";
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
  spacingProps: {
    ...getSpacingThemeProps()
  },
  themeStyle: undefined as (string | undefined),
  rounding: {
    borderRadius: '25px',
  },
  backgroundStyle: {
    opacity: OPACITY.partial,
    blur: '15px',
  },
};

export type ThemeType = typeof theme;


export const LIGHT_THEME: ITheme = {
  'text': theme.colors.black.noneOpacity,
  'textInvert': theme.colors.white.noneOpacity,
  'background': theme.colors.white.noneOpacity,
  'backgroundMediumOpacity': theme.colors.white.mediumOpacity,
  'backgroundHalfOpacity': theme.colors.white.halfOpacity,
  'contentBackground': theme.colors.white.noneOpacity,
  'contentBackgroundMediumOpacity': theme.colors.white.mediumOpacity,
  'contentBackgroundHalfOpacity': theme.colors.white.halfOpacity,
  'interfaceBackground': theme.colors.white.noneOpacity,
  'interfaceBackgroundMediumOpacity': theme.colors.white.mediumOpacity,
  'interfaceBackgroundHalfOpacity': theme.colors.white.halfOpacity,
  'backgroundInvert': theme.colors.black.noneOpacity,
  'backgroundInvertMediumOpacity': theme.colors.black.mediumOpacity,
  'primary': theme.colors.skyBlue.noneOpacity,
  'primaryHalfOpacity': theme.colors.skyBlue.halfOpacity,
  'primaryHighOpacity': theme.colors.skyBlue.highOpacity,
  'primaryLight': theme.colors.skyBlueLight.noneOpacity,
  'primaryLightHalfOpacity': theme.colors.skyBlueLight.halfOpacity,
  'primaryLightMostOpacity': theme.colors.skyBlueLight.mostOpacity,
  'primaryDark': theme.colors.skyBlueDark.noneOpacity,
  'primaryDarkHalfOpacity': theme.colors.skyBlueDark.halfOpacity,
  'secondary': theme.colors.ultraBlue.noneOpacity,
  'secondaryMediumOpacity': theme.colors.ultraBlue.mediumOpacity,
  'secondaryPartialOpacity': theme.colors.ultraBlue.partialOpacity,
  'secondaryLight': theme.colors.ultraBlueLight.noneOpacity,
  'secondaryLightMediumOpacity': theme.colors.ultraBlueLight.mediumOpacity,
  'secondaryDark': theme.colors.ultraBlueDark.noneOpacity,
  'secondaryDarkMediumOpacity': theme.colors.ultraBlueDark.mediumOpacity,
  'tertiary': theme.colors.gold.noneOpacity,
  'tertiaryPartialOpacity': theme.colors.gold.partialOpacity,
  'tertiaryMediumOpacity': theme.colors.gold.mediumOpacity,
  'tertiaryHalfOpacity': theme.colors.gold.halfOpacity,
  'tertiaryLight': theme.colors.goldLight.noneOpacity,
  'tertiaryDark': theme.colors.goldDark.noneOpacity,
  'highlight': theme.colors.orange.noneOpacity,
}

export const DARK_THEME: ITheme = {
  'text': theme.colors.white.noneOpacity,
  'textInvert': theme.colors.black.noneOpacity,
  'background': theme.colors.black.noneOpacity,
  'backgroundMediumOpacity': theme.colors.black.mediumOpacity,
  'backgroundHalfOpacity': theme.colors.black.halfOpacity,
  'contentBackground': theme.colors.notQuiteBlack.noneOpacity,
  'contentBackgroundMediumOpacity': theme.colors.notQuiteBlack.mediumOpacity,
  'contentBackgroundHalfOpacity': theme.colors.notQuiteBlack.halfOpacity,
  'interfaceBackground': theme.colors.almostBlack.noneOpacity,
  'interfaceBackgroundMediumOpacity': theme.colors.almostBlack.mediumOpacity,
  'interfaceBackgroundHalfOpacity': theme.colors.almostBlack.halfOpacity,
  'backgroundInvert': theme.colors.white.noneOpacity,
  'backgroundInvertMediumOpacity': theme.colors.white.mediumOpacity,
  'primary': theme.colors.blood.noneOpacity,
  'primaryHalfOpacity': theme.colors.blood.halfOpacity,
  'primaryHighOpacity': theme.colors.blood.highOpacity,
  'primaryLight': theme.colors.bloodLight.noneOpacity,
  'primaryLightHalfOpacity': theme.colors.bloodLight.halfOpacity,
  'primaryLightMostOpacity': theme.colors.bloodLight.mostOpacity,
  'primaryDark': theme.colors.bloodDark.noneOpacity,
  'primaryDarkHalfOpacity': theme.colors.bloodDark.halfOpacity,
  'secondary': theme.colors.blueBlue.noneOpacity,
  'secondaryMediumOpacity': theme.colors.blueBlue.mediumOpacity,
  'secondaryPartialOpacity': theme.colors.blueBlue.partialOpacity,
  'secondaryLight': theme.colors.blueBlueLight.noneOpacity,
  'secondaryLightMediumOpacity': theme.colors.blueBlueLight.mediumOpacity,
  'secondaryDark': theme.colors.blueBlueDark.noneOpacity,
  'secondaryDarkMediumOpacity': theme.colors.blueBlueDark.mediumOpacity,
  'tertiary': theme.colors.green.noneOpacity,
  'tertiaryPartialOpacity': theme.colors.green.partialOpacity,
  'tertiaryMediumOpacity': theme.colors.green.mediumOpacity,
  'tertiaryHalfOpacity': theme.colors.green.halfOpacity,
  'tertiaryLight': theme.colors.greenLight.noneOpacity,
  'tertiaryDark': theme.colors.greenDark.noneOpacity,
  'highlight': theme.colors.orange.noneOpacity,
}

export const setColorsByTheme = () => {
  function getInitialColorMode() {

    const siteState = window.localStorage.getItem('siteState');
    const persistedColorPreference = siteState && JSON.parse(siteState).state.themeStyle;
    const hasPersistedPreference = typeof persistedColorPreference === 'string' && persistedColorPreference !== '';

    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }

    return 'light';
  }
  const root = window.document.documentElement;

  const colorMode = getInitialColorMode();
  const COLORS = colorMode === 'light' ? 'LIGHT_THEME' : 'DARK_THEME';
  // Do stuff with `colors`, as if it was an object
  // that held everything!
  Object.entries(COLORS).forEach(([name, colorByTheme]) => {
    const cssVarName = `--${name}`;
    root.style.setProperty(cssVarName, colorByTheme);
  });
  root.style.setProperty('--initial-color-mode', colorMode);
}

export const getThemePropsString = (themeObject: ITheme) => {
  return (Object.keys(themeObject) as (keyof ITheme)[]).reduce((themeString, current) => {
    return themeString += `--${current}: ${themeObject[current]};`;
  }, '');
}

export const lightThemeProps = css`${getThemePropsString(LIGHT_THEME)}`;

export const darkThemeProps = css`${getThemePropsString(DARK_THEME)}`;

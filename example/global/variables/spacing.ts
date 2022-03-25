// Site Spacing
import { screenSize } from "./breakpoints";

export type IPropUnit = 'px' | 'vh' | 'vw' | '%';

type ISpacingProp = {
    value: string;
    unit: IPropUnit;
}

export type ISpacingProps = {
    [P in keyof typeof screenSize]: string;
}

export type ISpacing = {
    [spacingType: string]: Partial<ISpacingProps>
}

export const SPACING = {
    documentTopPadding: {
        mobile: '25px',
        tablet: '25px'
    } as ISpacingProps,
    pageGridGutters: {
        mobile: '40px',
        desktop: '15vw',
    } as ISpacingProps,
    defaultSpacing: {
        mobile: '25px',
        desktop: '35px',
    } as ISpacingProps,
    textSpacingX: {
        mobile: '25px',
        tablet: '1rem',
        desktop: '2rem',
    } as ISpacingProps,
    textSpacingY: {
        mobile: '0.5rem',
        desktop: '0.5rem',
    } as ISpacingProps,
    headerHeight: {
        mobile: '116px',
        desktop: '116px',
    } as ISpacingProps,
} as const;

type typedSpacing<T> = {
    -readonly [P in keyof T]: keyof typeof screenSize;
}
export type SpacingType = typedSpacing<typeof SPACING>;

export type SpacingProp = typeof SPACING[keyof typeof SPACING];

type ISpacingThemeProps<T> = {
    -readonly [P in keyof T]: string;
}

export const getSpacingThemeProps = () => {
    return (Object.keys(SPACING) as (keyof SpacingType)[]).reduce((spacingCSSProbObj, spacingPropName) => {
        spacingCSSProbObj[spacingPropName] = `var(--${spacingPropName})`;
        return spacingCSSProbObj;
    }, {} as ISpacingThemeProps<SpacingType>);
}

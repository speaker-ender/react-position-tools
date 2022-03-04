import { OPACITY } from "./opacity";

export const COLORS = {
    skyBlue: 'rgba(48, 194, 247, 1)',
    skyBlueLight: 'rgba(128, 221, 255, 1)',
    skyBlueDark: 'rgba(14, 147, 196, 1)',
    greyBlue: 'rgba(111, 160, 189, 1)',
    greyBlueLight: 'rgba(1, 96, 151, 1)',
    greyBlueDark: 'rgba(7, 59, 88, 1)',
    blood: 'rgba(216, 0, 0, 1)',
    bloodLight: 'rgba(255, 62, 62, 1)',
    bloodDark: 'rgba(107, 1, 1, 1)',
    green: 'rgba(10, 252, 71, 1)',
    greenLight: 'rgba(94, 253, 134, 1)',
    greenDark: 'rgba(2, 196, 51, 1)',
    black: 'rgba(0, 0, 0, 1)',
    white: 'rgba(255,255,255, 1)',
    dust: 'rgba(48, 48, 48, 1)',
    dustLight: 'rgba(63, 63, 63, 1)',
    dustDark: 'rgba(26, 25, 25, 1)',
    sand: 'rgba(236, 232, 209, 1)',
    sandLight: 'rgba(243, 242, 234, 1)',
    sandDark: 'rgba(175, 171, 145, 1)',
};

type ColorsType = typeof COLORS;

type FullColors<TC, TO> = { [P in keyof TC]: {
    [P2 in keyof TO & string as `${P2}Opacity`]: string
} }

type ColorPart<T> = {
    [P in keyof T & string as `${P}Opacity`]: string
}

export const colorFactory = () => {
    return (Object.keys(COLORS) as (keyof ColorsType)[]).reduce((colorObj, colorName) => {
        colorObj[colorName] = (Object.keys(OPACITY) as (keyof typeof OPACITY)[]).reduce((opacityObj, opacityName) => {
            const newOpacityName = `${opacityName}Opacity` as keyof ColorPart<typeof OPACITY>;
            opacityObj[newOpacityName] = COLORS[colorName].replace('1)', `${OPACITY[opacityName]})`);

            return opacityObj
        }, {} as ColorPart<typeof OPACITY>);

        return colorObj;
    }, {} as FullColors<ColorsType, typeof OPACITY>)
}

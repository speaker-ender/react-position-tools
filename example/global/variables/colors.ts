import { OPACITY } from "./opacity";

export const COLORS = {
    skyBlue: 'rgba(48, 194, 247, 1)',
    skyBlueLight: 'rgba(137, 217, 247, 1)',
    skyBlueDark: 'rgba(31, 126, 160, 1)',
    ultraBlue: 'rgba(48, 94, 247, 1)',
    ultraBlueLight: 'rgba(115, 148, 249, 1)',
    ultraBlueDark: 'rgba(32, 62, 164, 1)',
    blueBlue: 'rgba(0, 105, 216, 1)',
    blueBlueLight: 'rgba(54, 135, 216, 1)',
    blueBlueDark: 'rgba(0, 54, 105, 1)',
    greyBlue: 'rgba(111, 160, 189, 1)',
    greyBlueLight: 'rgba(1, 96, 151, 1)',
    greyBlueDark: 'rgba(7, 59, 88, 1)',
    blood: 'rgba(216, 0, 0, 1)',
    bloodLight: 'rgba(216, 54, 54, 1)',
    bloodDark: 'rgba(144, 0, 0, 1)',
    green: 'rgba(0, 216, 107, 1)',
    greenLight: 'rgba(54, 216, 134, 1)',
    greenDark: 'rgba(0, 140, 69, 1)',
    black: 'rgba(0, 0, 0, 1)',
    almostBlack: 'rgba(21, 21, 21, 1)',
    notQuiteBlack: 'rgba(43, 43, 43, 1)',
    white: 'rgba(255,255,255, 1)',
    dust: 'rgba(48, 48, 48, 1)',
    dustLight: 'rgba(63, 63, 63, 1)',
    dustDark: 'rgba(26, 25, 25, 1)',
    sand: 'rgba(236, 232, 209, 1)',
    sandLight: 'rgba(243, 242, 234, 1)',
    sandDark: 'rgba(175, 171, 145, 1)',
    gold: 'rgba(247, 200, 48, 1)',
    goldLight: 'rgba(247, 211, 97, 1)',
    goldDark: 'rgba(160, 130, 31, 1)',
    orange: 'rgba(247, 100, 48, 1)',
    orangeLight: 'rgba(247, 137, 97, 1)',
    orangeDark: 'rgba(160, 65, 31, 1)'
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

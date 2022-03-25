import { theme } from "./theme.styles";
import { OPACITY } from "./variables/opacity";

export const headerHeight = () => `calc(100vh - ${theme.spacingProps.headerHeight})`;

export const toggledOpacity = (isVisible: boolean) => isVisible ? OPACITY.none : OPACITY.full;

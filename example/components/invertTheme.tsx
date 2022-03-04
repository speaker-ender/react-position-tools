import * as React from "react"
import { useSiteState } from "../hooks/useSiteState";
import { StyledInvertThemeButton } from "./invertTheme.styles";

export interface IInvertTheme {
}

const InvertTheme: React.FC<IInvertTheme> = () => {
    const { themeInverted, setThemeInverted } = useSiteState();

    return (
        <StyledInvertThemeButton onClick={() => setThemeInverted(!themeInverted)}>
            Set
        </StyledInvertThemeButton>
    )
}

export default InvertTheme

import { useCallback, useEffect, useState } from "react";

interface IUseToggleProps {
    initialState?: boolean;
}

export const useToggle = (props: IUseToggleProps) => {
    const [isToggled, setIsToggled] = useState(props.initialState);

    const updateToggled = useCallback(() => {
        setIsToggled(!isToggled);
    }, [setIsToggled, isToggled]);

    return { isToggled, updateToggled };
}
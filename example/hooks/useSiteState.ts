import create from "zustand";


export interface IAlert {
    title?: string,
    text?: string,
    prompt?: string,
    active?: boolean,
}
interface ISiteState {
    overlayActive: boolean;
    setOverlayActive: (isActive: boolean) => void;
    navOpen: boolean;
    setNavOpen: (isOpen: boolean) => void;
    themeInverted: boolean;
    setThemeInverted: (isInverted: boolean) => void;
    alert: IAlert;
    setAlert: (newAlert: IAlert) => void;
    setAlertActive: (isActive: boolean) => void;
}

export const useSiteState = create<ISiteState>((set, get) => ({
    overlayActive: false,
    setOverlayActive: (isActive: boolean) => {
        set({ overlayActive: isActive });
    },
    navOpen: false,
    setNavOpen: (isOpen: boolean) => {
        set({ navOpen: isOpen });
    },
    themeInverted: false,
    setThemeInverted: (isInverted: boolean) => {
        set({ themeInverted: isInverted });
    },
    alert: {},
    setAlert: (newAlert: IAlert) => {
        set({ alert: { ...newAlert, active: true }, overlayActive: true });
    },
    setAlertActive: (isActive: boolean) => {
        set({ alert: { ...get().alert, active: isActive }, overlayActive: false });
    },
}));

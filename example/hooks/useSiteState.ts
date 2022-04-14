import { scrollTopDistance } from "@speaker-ender/js-measure";
import { AsyncLocalStorage } from "async_hooks";
import create from "zustand";
import { persist } from "zustand/middleware";

export interface IAlert {
  title?: string;
  text?: string;
  prompt?: string;
  active?: boolean;
}

export interface INotification {
  title: string;
  text?: string;
  link?: string;
  time: number;
}
interface ISiteState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  overlayActive: boolean;
  setOverlayActive: (isActive: boolean) => void;
  navOpen: boolean;
  setNavOpen: (isOpen: boolean) => void;
  lockedScroll: number;
  setLockedScroll: (currentScroll: number) => void;
  themeStyle?: string;
  setThemeStyle: (themeStyle: string) => void;
  alert: IAlert;
  setAlert: (newAlert: IAlert) => void;
  setAlertActive: (isActive: boolean) => void;
  bannerActive: boolean;
  setBannerActive: (isActive: boolean) => void;
  notifications: INotification[];
  setNotification: (notification: Omit<INotification, "time">) => void;
  dismissNotification: (notification: INotification) => void;
}

export const useSiteState = create<ISiteState>(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      lockedScroll: 0,
      setLockedScroll: (currentScroll: number) => {
        set({ lockedScroll: currentScroll });
      },
      overlayActive: false,
      setOverlayActive: (isActive: boolean) => {
        // !!isActive && set({ lockedScroll: scrollTopDistance() });
        set({ overlayActive: isActive });
      },
      navOpen: false,
      setNavOpen: (isOpen: boolean) => {
        set({ navOpen: isOpen });
      },
      themeStyle: undefined,
      setThemeStyle: (newThemeStyle: string) => {
        set({ themeStyle: newThemeStyle });
      },
      alert: {},
      setAlert: (newAlert: IAlert) => {
        set({ alert: { ...newAlert, active: true }, overlayActive: true });
      },
      setAlertActive: (isActive: boolean) => {
        set({
          alert: { ...get().alert, active: isActive },
          overlayActive: false,
        });
      },
      bannerActive: false,
      setBannerActive: (isActive: boolean) => {
        set({ bannerActive: isActive });
      },
      notifications: [],
      setNotification: (notification: Omit<INotification, "time">) => {
        set({
          notifications: [
            ...get().notifications,
            { ...notification, time: Date.now() },
          ],
        });
      },
      dismissNotification: (notification: INotification) => {
        set({
          notifications: get().notifications.filter(
            (note) => note !== notification
          ),
        });
      },
    }),
    {
      name: "siteState",
      getStorage: () => localStorage,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              !["navOpen", "overlayActive", "alert", "lockedScroll"].includes(
                key
              )
          )
        ),
      onRehydrateStorage: () => (state) => {
        state && state.setHasHydrated(true);
      },
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
    }
  )
);

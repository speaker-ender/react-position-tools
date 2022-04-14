import { useRouter, RouterEvent } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSiteState } from "./useSiteState";

interface IUseToggleProps {
  initialState?: boolean;
}

export const useSiteRoutes = () => {
  const router = useRouter();
  const { setNavOpen, setOverlayActive } = useSiteState();

  useEffect(() => {
    const handleRouteChange = (url: string, {}) => {
      setNavOpen(false);
      setOverlayActive(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return { currentPath: router.pathname };
};

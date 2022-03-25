import * as React from "react";
import { useSiteRoutes } from "../hooks/useSiteRoutes";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { TransitionGroup, SwitchTransition, CSSTransition } from "react-transition-group";
import { useCallback, useRef } from "react";
import { StyledPageTransition } from "./page.styles";
import { useSiteState } from "../hooks/useSiteState";
import { scrollTopDistance } from "@speaker-ender/js-measure";

const PageTransition: React.FC = ({ children }) => {
    const isClient = useClientHook();
    const transitionNode = useRef<HTMLDivElement>(null);
    const { currentPath } = useSiteRoutes();
    const { setLockedScroll } = useSiteState();

    const onEntered = useCallback(() => {
        if (isClient) {
            setLockedScroll(scrollTopDistance());
        }
    }, [isClient, setLockedScroll]);

    const onExit = React.useCallback(() => {
        if (isClient) {
        }
    }, [isClient]);

    const onExited = useCallback(() => {

    }, [isClient]);

    return (
        <TransitionGroup appear={true} component={null}>
            <SwitchTransition>
                <CSSTransition
                    timeout={400}
                    key={currentPath}
                    onExit={onExit}
                    onExited={onExited}
                    onEntered={onEntered}
                    nodeRef={transitionNode}
                >
                    <StyledPageTransition ref={transitionNode}>
                        {children}
                    </StyledPageTransition>
                </CSSTransition>
            </SwitchTransition>
        </TransitionGroup>
    )
}

export default PageTransition;
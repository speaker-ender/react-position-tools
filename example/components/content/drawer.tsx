import * as React from "react"
import { useToggle } from "../../hooks/useToggle";
import { StyledDrawer, StyledDrawerContent, StyledDrawerContentWrapper, StyledDrawerHeader, StyledDrawerIcon, StyledDrawerTitle } from "./drawer.styles";
import { CSSTransition } from 'react-transition-group';
import { useCallback, useRef, useState } from "react";
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { height } from "@speaker-ender/js-measure";

export interface IDrawer {
    title?: string;
    defaultOpen?: boolean;
    children?: React.ReactNode;
}

const Drawer: React.FC<IDrawer> = (props) => {
    const isClient = useClientHook();
    const [drawerHeight, setDrawerHeight] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);
    const { isToggled, updateToggled } = useToggle({ initialState: props.defaultOpen });

    const onEnter = useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight('0px');
    }, [contentRef, setDrawerHeight, isClient]);

    const onEntering = useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight(`${height(contentRef.current)}px`);
    }, [contentRef, setDrawerHeight, isClient]);

    const onEntered = useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight('none');
    }, [contentRef, setDrawerHeight, isClient]);

    const onExit = React.useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight(`${height(contentRef.current)}px`);
    }, [contentRef, setDrawerHeight, isClient]);

    const onExiting = React.useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight(`0px`);

    }, [contentRef, setDrawerHeight, isClient]);

    const onExited = useCallback(() => {
        isClient && !!contentRef.current && setDrawerHeight(`0px`);

    }, [contentRef, setDrawerHeight, isClient]);

    return (
        <StyledDrawer open={!!isToggled}>
            <StyledDrawerHeader open={!!isToggled} onClick={() => updateToggled()}>
                <StyledDrawerTitle open={!!isToggled}>
                    {props.title}
                </StyledDrawerTitle>
                <StyledDrawerIcon open={!!isToggled}>{isToggled ? '-' : '+'}</StyledDrawerIcon>
            </StyledDrawerHeader>
            <CSSTransition
                timeout={500}
                onEnter={onEnter}
                onEntering={onEntering}
                onEntered={onEntered}
                onExit={onExit}
                onExiting={onExiting}
                onExited={onExited}
                nodeRef={contentRef}
                in={!!isToggled}
            >
                <StyledDrawerContentWrapper open={!!isToggled} style={{ maxHeight: drawerHeight }}>
                    <StyledDrawerContent ref={contentRef} open={!!isToggled}>
                        {props.children}
                    </StyledDrawerContent>
                </StyledDrawerContentWrapper>
            </CSSTransition>

        </StyledDrawer>
    )
}

export default Drawer

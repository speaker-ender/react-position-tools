
import dynamic from "next/dynamic";
import * as React from "react";
import { useSiteState } from "../../hooks/useSiteState";
import Notification from "./notification";
import { StyledNotificationTray, StyledNotificationWrapper } from "./notificationTray.styles";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { height } from '@speaker-ender/js-measure';
import { useClientHook } from "@speaker-ender/react-ssr-tools";
import { theme } from "../../global/theme.styles";

interface INotificationTray {
}

interface ITrayHeight {
    current: number,
    next: number,
}

const getHeightString = (element: HTMLElement) => {
    const elementHeight = height(element);
    const spacing = elementHeight > 0 ? theme.spacingProps.defaultSpacing : '0px';
    return `calc(${elementHeight}px + ${spacing})`;
}

const NotificationTray: React.FC<INotificationTray> = (props) => {
    const isClient = useClientHook();
    const { notifications } = useSiteState();
    const wrapperRefs = useMemo(() => !!notifications && notifications.map(() => createRef<HTMLDivElement>()), [notifications]);
    const notificationRefs = useMemo(() => !!notifications && notifications.map(() => React.createRef<HTMLDivElement>()), [notifications]);

    const onEnter = useCallback((index: number) => {
        if (isClient) {
            const currentWrapper = wrapperRefs[index];

            if (!!currentWrapper.current) {
                currentWrapper.current.style.setProperty('max-height', '0px');
            }
        }
    }, [wrapperRefs, isClient]);

    const onEntering = useCallback((index: number) => {
        if (isClient) {
            const currentWrapper = wrapperRefs[index];
            const currentNotification = notificationRefs[index];

            if (!!currentNotification.current && !!currentWrapper.current) {
                const heightString = getHeightString(currentNotification.current as HTMLElement);
                currentWrapper.current.style.setProperty('max-height', heightString);
            }
        }
    }, [wrapperRefs, notificationRefs, isClient]);

    const onEntered = useCallback((index: number) => {

        if (isClient) {
            const currentWrapper = wrapperRefs[index];

            if (!!currentWrapper.current) {
                currentWrapper.current.style.setProperty('max-height', 'none');
            }
        }
    }, [wrapperRefs, isClient]);

    const onExit = React.useCallback((index: number) => {
        if (isClient) {
            const currentWrapper = wrapperRefs[index];
            const currentNotification = notificationRefs[index];

            if (!!currentNotification.current && !!currentWrapper.current) {
                const heightString = getHeightString(currentNotification.current as HTMLElement);
                currentWrapper.current.style.setProperty('max-height', heightString);
            }
        }
    }, [wrapperRefs, notificationRefs, isClient]);

    const onExiting = React.useCallback((index: number) => {
        if (isClient) {
            const currentWrapper = wrapperRefs[index];

            if (!!currentWrapper && !!currentWrapper.current) {
                currentWrapper.current.style.setProperty('max-height', `0px`);
            }
        }

    }, [wrapperRefs, isClient]);


    return (
        <StyledNotificationTray>
            <StyledNotificationWrapper>
                <TransitionGroup appear={true} component={null} >
                    {notifications.map((notification, index) => {
                        return (
                            <CSSTransition
                                key={isClient ? notification.time.toString() : index}
                                timeout={400}
                                onEnter={() => onEnter(index)}
                                onEntering={() => onEntering(index)}
                                onEntered={() => onEntered(index)}
                                onExit={() => onExit(index)}
                                onExiting={() => onExiting(index)}
                                mountOnEnter={true}
                                nodeRef={wrapperRefs[index]}
                                unmountOnExit={true}
                            >
                                <Notification
                                    data={notification}
                                    wrapperRef={wrapperRefs[index]}
                                    notificationRef={notificationRefs[index]}
                                />
                            </CSSTransition>
                        );
                    }
                    )}
                </TransitionGroup>
            </StyledNotificationWrapper>
        </StyledNotificationTray>
    )
}

export default NotificationTray;
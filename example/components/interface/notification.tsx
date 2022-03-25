
import * as React from "react";
import { Suspense } from "react";
import { INotification, useSiteState } from "../../hooks/useSiteState";
import { StyledNotification, StyledNotificationClose, StyledNotificationContent, StyledNotificationText, StyledNotificationTitle, StyledNotificationWrapper } from "./notification.styles";


export interface INotificationMessage {
    data: INotification
    wrapperRef: React.ForwardedRef<HTMLDivElement>;
    notificationRef: React.ForwardedRef<HTMLDivElement>;
}

const Notification: React.FC<INotificationMessage> = (props) => {
    const { dismissNotification } = useSiteState();

    return (
        <StyledNotificationWrapper ref={props.wrapperRef}>
            <StyledNotification ref={props.notificationRef}>
                <StyledNotificationContent>
                    <StyledNotificationTitle>
                        {props.data.title}
                    </StyledNotificationTitle>
                    <StyledNotificationText>
                        {props.data.text}
                        {props.data.time.toString()}
                    </StyledNotificationText>
                </StyledNotificationContent>
                <StyledNotificationClose onClick={() => dismissNotification(props.data)}>
                    ❌
                </StyledNotificationClose>
            </StyledNotification>
        </StyledNotificationWrapper>

    )
}

export default Notification;
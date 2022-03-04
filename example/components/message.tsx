
import * as React from "react";
import { StyledMessage, StyledMessageClose, StyledMessageContent } from "./message.styles";

interface IMessage {
}

const Message: React.FC<IMessage> = (props) => {

    return (
        <StyledMessage>
            <StyledMessageContent>
            </StyledMessageContent>
            <StyledMessageClose>
                ❌
            </StyledMessageClose>
        </StyledMessage>
    )
}

export default Message;

import * as React from "react";
import { Suspense } from "react";
import { useSiteState } from "../../hooks/useSiteState";
import { StyledBannerMessage, StyledBannerMessageClose, StyledBannerMessageContent } from "./bannerMessage.styles";

interface IBannerMessage {
    bannerActive?: boolean;
}

const RAWBannerMessage: React.FC<IBannerMessage> = (props) => {
    const { setBannerActive } = useSiteState();

    return (
        <StyledBannerMessage isActive={props.bannerActive}>
            <StyledBannerMessageContent>
                Banner Message
            </StyledBannerMessageContent>
            <StyledBannerMessageClose onClick={() => setBannerActive(false)}>
                ❌
            </StyledBannerMessageClose>
        </StyledBannerMessage>
    )
}



const BannerMessage: React.FC<IBannerMessage> = (props) => {
    const { bannerActive } = useSiteState();

    return (
        <Suspense fallback={<RAWBannerMessage />}>
            <RAWBannerMessage bannerActive={bannerActive} />
        </Suspense>
    )
}

export default BannerMessage;
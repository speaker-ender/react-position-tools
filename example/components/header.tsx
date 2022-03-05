import Link from "next/link";
import * as React from "react";
import { useSiteState } from "../hooks/useSiteState";
import { StyledHeader, StyledHeaderTitle, StyledNavButton } from "./header.styles";

interface IHeader {
}

const Header: React.FC<IHeader> = (props) => {
    const { setOverlayActive, navOpen, setNavOpen } = useSiteState();

    const handleClick = () => {
        setNavOpen(!navOpen);
        setOverlayActive(!navOpen);
    }

    return (
        <StyledHeader>
            <StyledHeaderTitle>
                <Link href={'/'}>
                    Position Tools
                </Link>
            </StyledHeaderTitle>
            <StyledNavButton onClick={() => handleClick()}>
                {navOpen ? '❌' : '✙'}
            </StyledNavButton>
        </StyledHeader>
    )
}

export default Header;
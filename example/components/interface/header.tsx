import Link from "next/link";
import * as React from "react";
import { useSiteState } from "../../hooks/useSiteState";
import {
  StyledHeader,
  StyledHeaderTitle,
  StyledNavButton,
} from "./header.styles";

interface IHeader {}

const Header: React.FC<IHeader> = (props) => {
  const {
    setOverlayActive,
    navOpen,
    setNavOpen,
    setAlertActive,
    alert,
    overlayActive,
  } = useSiteState();

  const handleClick = () => {
    !alert.active ? setNavOpen(!navOpen) : setAlertActive(false);
    setOverlayActive(!overlayActive);
  };

  return (
    <StyledHeader>
      <StyledHeaderTitle>
        <Link href={"/"}>3NDER</Link>
      </StyledHeaderTitle>
      <StyledNavButton onClick={() => handleClick()}>
        {navOpen || alert.active ? "❌" : "✙"}
      </StyledNavButton>
    </StyledHeader>
  );
};

export default Header;

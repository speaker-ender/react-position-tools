import Link from "next/link";
import * as React from "react";
import { useSiteState } from "../../hooks/useSiteState";
import {
  StyledHam,
  StyledHamPart,
  StyledHeader,
  StyledHeaderTitle,
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
        <Link href={"/"}>📏</Link>
      </StyledHeaderTitle>
      <StyledHam isOpen={navOpen} onClick={() => handleClick()}>
        <StyledHamPart />
        <StyledHamPart />
      </StyledHam>
    </StyledHeader>
  );
};

export default Header;

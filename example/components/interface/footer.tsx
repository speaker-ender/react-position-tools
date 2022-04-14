import Link from "next/link";
import * as React from "react";
import { StyledLink } from "../../global/link.styles";
import { StyledFooter, StyledFooterContent } from "./footer.styles";

interface IHeader {}

const Footer: React.FC<IHeader> = (props) => {
  return (
    <StyledFooter>
      <StyledFooterContent>
        <StyledLink>
          <Link href={"/"}>3NDER</Link>
        </StyledLink>
        © {new Date().getFullYear()}
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;

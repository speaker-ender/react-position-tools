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
          <a href={"https://3nder.io"} target="_blank" rel="noreferrer">
            3NDER
          </a>
        </StyledLink>
        © {new Date().getFullYear()}
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;

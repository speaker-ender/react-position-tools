import * as React from "react";
import { StyledButton } from "../../global/button.styles";
import { useSiteState } from "../../hooks/useSiteState";
import { StyledAlert, StyledAlertText, StyledAlertTitle } from "./alert.styles";

export interface IAlert {}

const Alert: React.FC<IAlert> = () => {
  const { alert, setAlertActive } = useSiteState();

  return (
    <StyledAlert active={!!alert.active}>
      <StyledAlertTitle
        dangerouslySetInnerHTML={{ __html: alert.title || "" }}
      />
      <StyledAlertText dangerouslySetInnerHTML={{ __html: alert.text || "" }} />
      <StyledButton
        dangerouslySetInnerHTML={{ __html: alert.prompt || "" }}
        onClick={() => setAlertActive(false)}
      ></StyledButton>
    </StyledAlert>
  );
};

export default Alert;

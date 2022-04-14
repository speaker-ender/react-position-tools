import * as React from "react";
import { ReactNode } from "react";
import { ILayoutProps } from "..";
import { StyledPage } from "../../../global/page.styles";
import { StyledPanel } from "../../../global/panel.styles";
import {
  Header2,
  StyledCodeHeader,
  StyledCodeProperty,
  StyledCodePropertyType,
} from "../../../global/typography";
import Paragraph from "../../content/paragraph";

// Gallery Layout
//  _______________________________________
// | Header                                |
// ----------------------------------------
// |                                       |
// |            Page Content               |
// |                                       |
// |                                       |
// |                                       |
// |                                       |
// |_______________________________________|
// |               Footer                  |
// |_______________________________________|

export type parameter = {
  name: string;
  type: string;
  optional?: boolean;
  defaultValue?: string;
  description?: string;
};
export interface IDescriptionLayout extends ILayoutProps {
  componentName: string;
  parameters?: parameter[];
  description: string[];
  children?: ReactNode;
}

const getComponentAttributeString = (parameter: parameter) => {
  return (
    <span key={parameter.name}>
      <StyledCodeProperty>{parameter.name}</StyledCodeProperty>
      {parameter.optional ? "?" : ""}:{" "}
      <StyledCodePropertyType>{parameter.type}</StyledCodePropertyType>
      {` `}
    </span>
  );
};

const getComponentTitle = (name: string, parameters: parameter[]) => {
  return (
    <>
      {`<${name} `}
      {parameters.map((parameter) => getComponentAttributeString(parameter))}
      {`/>`}
    </>
  );
};

const ComponentLayout: React.FC<IDescriptionLayout> = (props) => {
  return (
    <StyledPage>
      <Header2>
        <StyledCodeHeader>
          {getComponentTitle(props.componentName, props.parameters || [])}
        </StyledCodeHeader>
      </Header2>
      <StyledPanel>
        {props.description.map((paragraph, index) => {
          return <Paragraph text={paragraph} key={index} />;
        })}
      </StyledPanel>
      {props.children}
    </StyledPage>
  );
};

export default ComponentLayout;

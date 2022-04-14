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
  functionName: string;
  parameters?: parameter[];
  description: string[];
  children?: ReactNode;
}

const getFunctionParameterString = (
  parameter: parameter,
  index: number,
  array: parameter[]
) => {
  return (
    <span key={parameter.name}>
      <StyledCodeProperty>{parameter.name}</StyledCodeProperty>
      {parameter.optional ? "?" : ""}:{" "}
      <StyledCodePropertyType>{parameter.type}</StyledCodePropertyType>
      {`${index < array.length - 1 ? ", " : ""}`}
    </span>
  );
};

const getFunctionTitle = (name: string, parameters: parameter[]) => {
  return (
    <>
      {`${name}(`}
      {parameters.map((parameter, index, array) =>
        getFunctionParameterString(parameter, index, array)
      )}
      {`)`}
    </>
  );
};

const FunctionLayout: React.FC<IDescriptionLayout> = (props) => {
  return (
    <StyledPage>
      <Header2>
        <StyledCodeHeader>
          {getFunctionTitle(props.functionName, props.parameters || [])}
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

export default FunctionLayout;

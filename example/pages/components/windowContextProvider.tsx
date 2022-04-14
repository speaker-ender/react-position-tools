import type { NextPage } from "next";
import ComponentLayout from "../../components/layouts/documentation/component.layout";

const WindowContextProviderPage: NextPage = () => {
  return (
    <ComponentLayout
      componentName="WindowContextProvider"
      description={[]}
      parameters={[
        {
          name: "listenerInterval",
          type: "number",
          optional: true,
        },
        {
          name: "stateInterval",
          type: "number",
          optional: true,
        },
      ]}
    />
  );
};

export default WindowContextProviderPage;

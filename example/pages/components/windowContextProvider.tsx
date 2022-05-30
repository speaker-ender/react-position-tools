import type { NextPage } from "next";
import ComponentLayout from "../../components/layouts/documentation/component.layout";

const WindowContextProviderPage: NextPage = () => {
  return (
    <ComponentLayout
      componentName="WindowContextProvider"
      description={[
        "This component provides the context for the windows dimensions and the window object. It is used by the useWindowContext hook.",
      ]}
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

import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useElementTrackingPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useElementTracking"
      description={[
        "This hook is used to register callbacks whenever an element's DOM properties are changed.",
        "You can pass an array of the properties that you would like to track to prevent unnecessary callbacks and calcuations",
        "This hook must be used in a component that is a descendant of the WindowContextProvider, ViewportContextProvider, and ScrollContextProvider in order to function.",
      ]}
      parameters={[
        {
          name: "trackedProperties",
          type: "IElementState",
          optional: true,
        },
        {
          name: "updateInterval",
          type: "number",
          optional: true,
        },
      ]}
    />
  );
};

export default useElementTrackingPage;

import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useElementTrackingPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useElementTracking"
      description={[]}
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

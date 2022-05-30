import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useCursorTrackingPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useCursorTracking"
      description={[
        "This hook is used to register callbacks whenever the cursor is hovering over an element.",
        "The callback function returns both the x and y coordinates of the cursor relative to the element being tracked, as well as percentage the cursor is away from the top left corner of the element.",
      ]}
    />
  );
};

export default useCursorTrackingPage;

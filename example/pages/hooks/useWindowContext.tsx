import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useWindowContextPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useWindowContext"
      description={[
        "This hook is used for registering callbacks for changes in the dimensions of the window.",
        "In most cases you should use the useViewportContext instead, unless you need to account for dynamic address bar heights on mobile.",
      ]}
    />
  );
};

export default useWindowContextPage;

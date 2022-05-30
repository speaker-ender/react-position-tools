import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useViewportContextPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useViewportContext"
      description={[
        "This hook is used to register callbacks whenever the viewport dimensions changed based on a component with the dimensions 100vw x 100vh",
        "In most cases, you should use this hook instead of the useWindowContext in order for more consistent results on mobile.",
        "This is due to mobile browsers that have dynamiclly sized address bars that can trigger height changes on scroll.",
      ]}
    />
  );
};

export default useViewportContextPage;

import type { NextPage } from "next";
import FunctionLayout from "../../components/layouts/documentation/function.layout";

const useCursorContextPage: NextPage = () => {
  return (
    <FunctionLayout
      functionName="useCursorContext"
      description={[
        "This hook is used for registering callbacks whenever the cursors position updates relative to the viewport.",
      ]}
    />
  );
};

export default useCursorContextPage;

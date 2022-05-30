import type { NextPage } from "next";
import ComponentLayout from "../../components/layouts/documentation/component.layout";

const CursorContextProviderPage: NextPage = () => {
  return (
    <ComponentLayout
      componentName="CursorContextProvider"
      description={[
        "This component provides the context for the cursors position on screen relative to the viewport and is used by the useCursorContext hook.",
      ]}
      parameters={[]}
    />
  );
};

export default CursorContextProviderPage;

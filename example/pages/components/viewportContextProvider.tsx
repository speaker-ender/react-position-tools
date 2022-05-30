import type { NextPage } from "next";
import ComponentLayout from "../../components/layouts/documentation/component.layout";

const ViewportContextProviderPage: NextPage = () => {
  return (
    <ComponentLayout
      componentName="ViewportContextProvider"
      description={[
        "This component provides the context for the viewport dimensions. It is used by the useViewportContext hook.",
        "What makes this provider different from the WindowContextProvider is that it relies on a DOM element with a size of 100vh x 100vw to measure the viewport dimensions.",
        "This is important because mobile browsers that have changing viewport heights when scrolling that can cause frequent event callbacks when scrolling that can decrease your sites performance.",
        "In order to function properly, this component must be a descendant of the WindowContextProvider component.",
      ]}
      parameters={[]}
    />
  );
};

export default ViewportContextProviderPage;

import type { NextPage } from "next";
import ImageComponent from "../../components/content/image";
import { StyledPanel } from "../../global/panel.styles";
import { Header2, Header4, Paragraph } from "../../global/typography";
import { StyledPage } from "../../global/page.styles";
import { useElementTracking } from "@speaker-ender/react-position-tools";

const TrackedElementDemo: NextPage = () => {
  const [elementState, registerCallback, unregisterCallbac, refCallback] =
    useElementTracking();

  return (
    <StyledPage>
      <Header2>Tracked Element</Header2>
      <StyledPanel>
        <Header4>Directions</Header4>
      </StyledPanel>
      <ImageComponent
        refCallback={(element) => element && refCallback(element)}
      />
      <StyledPanel>
        <Header4>Element Properties</Header4>
        <Paragraph>{`topPosition(): ${
          elementState.current && elementState.current.top
        }px`}</Paragraph>
        <Paragraph>{`relativeTopPosition(): ${
          elementState.current && elementState.current.relativeTop
        }px`}</Paragraph>
        <Paragraph>{`leftPosition(): ${
          elementState.current && elementState.current.left
        }px`}</Paragraph>
        <Paragraph>{`bottomPosition(): ${
          elementState.current && elementState.current.bottom
        }px`}</Paragraph>
        <Paragraph>{`relativeBottomPosition(): ${
          elementState.current && elementState.current.relativeBottom
        }px`}</Paragraph>
        <Paragraph>{`right(): ${
          elementState.current && elementState.current.right
        }px`}</Paragraph>
        <Paragraph>{`width(): ${
          elementState.current && elementState.current.width
        }px`}</Paragraph>
        <Paragraph>{`height(): ${
          elementState.current && elementState.current.height
        }px`}</Paragraph>
      </StyledPanel>
    </StyledPage>
  );
};

export default TrackedElementDemo;

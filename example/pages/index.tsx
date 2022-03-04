import type { NextPage } from 'next'
import DebugPanel from '../components/debugPanel';
import ImageComponent from '../components/image';
import { StyledImageGrid } from '../components/imageGrid.styles';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Paragraph } from '../global/typography';
import { StyledPage } from './page.styles';
import { useWindowContext } from '../../src/index';

const Home: NextPage = () => {
  const { windowDimensions } = useWindowContext();

  return (
    <StyledPage>
      <StyledPanel>
        <Header4>Directions</Header4>
      </StyledPanel>
      <StyledImageGrid columns={2}>
        <ImageComponent />
        <ImageComponent />
        <StyledImageGrid columns={2}>
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
        </StyledImageGrid>
        <StyledImageGrid columns={4} rows={4}>
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
          <ImageComponent />
        </StyledImageGrid>
      </StyledImageGrid>
      <StyledImageGrid columns={1}>
        <ImageComponent />
        <ImageComponent />
      </StyledImageGrid>
      <DebugPanel defaultOpen={true}>
        <Header4>Window Properties</Header4>
        <Paragraph>{`WindowWidth: ${windowDimensions && windowDimensions.width}px`}</Paragraph>
        <Paragraph>{`WindowHeight: ${windowDimensions && windowDimensions.height}px`}</Paragraph>
      </DebugPanel>
    </StyledPage >
  )
}

export default Home

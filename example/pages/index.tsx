import type { NextPage } from 'next'
import DebugPanel from '../components/debugPanel';
import ImageComponent from '../components/image';
import { StyledImageGrid } from '../components/imageGrid.styles';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Paragraph } from '../global/typography';
import { StyledPage } from './page.styles';
import { useWindowContext } from '../../src/index';
import { IWindowDimensions } from '../../src/window.context';
import { useCallback, useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { registerResizeCallback, windowDimensions } = useWindowContext();
  const [windowState, setWindowState] = useState<IWindowDimensions>();

  const resizeCallback = useCallback((newWindowState?: IWindowDimensions) => {
    newWindowState && setWindowState(newWindowState);
  }, [setWindowState])

  useEffect(() => {
    resizeCallback(windowDimensions);
    registerResizeCallback && registerResizeCallback(resizeCallback);
  }, []);

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
        <Paragraph>{`WindowWidth: ${windowState && windowState.width}px`}</Paragraph>
        <Paragraph>{`WindowHeight: ${windowState && windowState.height}px`}</Paragraph>
      </DebugPanel>
    </StyledPage >
  )
}

export default Home
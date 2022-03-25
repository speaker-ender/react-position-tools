import type { NextPage } from 'next'
import ImageComponent from '../components/content/image';
import { StyledImageGrid } from '../components/content/imageGrid.styles';
import { StyledPanel } from '../global/panel.styles';
import { Header2, Header4 } from '../global/typography';
import { StyledPage } from '../global/page.styles';
import { StyledGridItem } from '../components/grid.styles';
import ImageGrid from '../components/content/imageGrid';
import Grid from '../components/grid';
import ParagraphComponent from '../components/content/paragraph';

const Home: NextPage = () => {

  return (
    <StyledPage>
      <Header2>
        React Position Tools
      </Header2>
      <StyledPanel>
        <ParagraphComponent text='React Hooks and Contexts for DOM Positions' />
      </StyledPanel>
    </StyledPage>
  )
}

export default Home

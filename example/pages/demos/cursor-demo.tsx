import type { NextPage } from 'next'
import { StyledPanel } from '../../global/panel.styles';
import { Header2, Header4, Header5, Paragraph } from '../../global/typography';
import { StyledPage } from '../../global/page.styles';
import { useIsCursorActive, useCursorContext } from '@speaker-ender/react-position-tools';
import DebugPanel from '../../components/interface/debugPanel';
import { useCallback, useState } from 'react';
import { StyledCursorContainer } from '../../components/cursor/cursor-demo.styles';
import { StyledImageGrid } from '../../components/content/imageGrid.styles';
import CursorParalax from '../../components/cursor/cursorParalax';
import { IPos } from '@speaker-ender/react-position-tools/dist/cursor.context';
import { ICursorTrackingState } from '@speaker-ender/react-position-tools/dist/useCursorTracking.hook';

const CursorDemo: NextPage = () => {
    const { cursorPosition } = useCursorContext();
    const isActive = useIsCursorActive();
    const [activeCursorPosition, setActiveCursorPosition] = useState<ICursorTrackingState>(null!);

    const positionCallback = useCallback((activePixels: IPos, activePercent: IPos) => {
        activePixels && setActiveCursorPosition({ pixels: activePixels, percent: activePercent })
    }, [setActiveCursorPosition]);

    return (
        <StyledPage>
            <Header2>Cursor Demo</Header2>
            <StyledPanel>
                <Header4>Directions</Header4>
                <Paragraph>Move the cursor around the viewport to see the image background change colors</Paragraph>
                <Paragraph>The percentage values being used can be seen in the debug panel</Paragraph>
            </StyledPanel>
            <StyledCursorContainer>
                <StyledImageGrid columns={2}>
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <StyledImageGrid columns={2}>
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                    </StyledImageGrid>
                </StyledImageGrid>
                <StyledImageGrid columns={3}>
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <StyledImageGrid columns={3}>
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                        <CursorParalax positionCallback={positionCallback} />
                    </StyledImageGrid>
                </StyledImageGrid>
            </StyledCursorContainer>
            <DebugPanel defaultOpen={true}>
                <Header4>Cursor Properties</Header4>
                <Header5>Relative To Element</Header5>
                <Paragraph>{`x: ${activeCursorPosition && activeCursorPosition.percent.x}%`}</Paragraph>
                <Paragraph>{`y: ${activeCursorPosition && activeCursorPosition.percent.y}%`}</Paragraph>
                <Paragraph>{`x: ${activeCursorPosition && activeCursorPosition.pixels.x}px`}</Paragraph>
                <Paragraph>{`y: ${activeCursorPosition && activeCursorPosition.pixels.y}px`}</Paragraph>
                <Header5>Relative To Viewport</Header5>
                <Paragraph>{`x: ${cursorPosition?.currentPosition?.x}px`}</Paragraph>
                <Paragraph>{`y: ${cursorPosition?.currentPosition?.y}px`}</Paragraph>
            </DebugPanel>
        </StyledPage >
    )
}

export default CursorDemo

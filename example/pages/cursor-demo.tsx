import type { NextPage } from 'next'
import ImageComponent from '../components/image';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Header5, Paragraph } from '../global/typography';
import { StyledPage } from '../global/page.styles';
import { useCursorTracking, useIsCursorActive, useCursorContext } from '../../src/index';
import DebugPanel from '../components/debugPanel';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { StyledCursorContainer } from '../components/cursor-demo.styles';
import { StyledImageGrid } from '../components/imageGrid.styles';
import CursorParalax from '../components/cursorParalax';
import { IPos } from '../../src/cursor.context';
import { ICursorTrackingState } from '../../src/useCursorTracking.hook';

const CursorDemo: NextPage = () => {
    const { cursorPosition } = useCursorContext();
    const isActive = useIsCursorActive();
    const [activeCursorPosition, setActiveCursorPosition] = useState<ICursorTrackingState>(null!);

    const positionCallback = useCallback((activePixels: IPos, activePercent: IPos) => {
        activePixels && setActiveCursorPosition({ pixels: activePixels, percent: activePercent })
    }, [setActiveCursorPosition]);

    return (
        <StyledPage>
            <StyledPanel>
                <Header4>Directions</Header4>
                <Paragraph>Move the cursor around the viewport to see the image background change colors</Paragraph>
                <Paragraph>The percentage values being used can be seen in the debug panel</Paragraph>
            </StyledPanel>
            <StyledCursorContainer>
                <StyledImageGrid columns={3}>
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
                    <CursorParalax positionCallback={positionCallback} />
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

import type { NextPage } from 'next'
import ImageComponent from '../components/image';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Paragraph } from '../global/typography';
import { StyledPage } from '../global/page.styles';
import { useCursorPercent, useIsCursorActive, useCursorPosition } from '../../src/index';
import DebugPanel from '../components/debugPanel';

const CursorDemo: NextPage = () => {
    // const { x, y } = useCursorPosition();
    const { x, y } = useCursorPercent();
    const isActive = useIsCursorActive();

    return (
        <StyledPage>
            <StyledPanel>
                <Header4>Directions</Header4>
                <Paragraph>Move the cursor around the viewport to see the image background change colors</Paragraph>
                <Paragraph>The percentage values being used can be seen in the debug panel</Paragraph>
            </StyledPanel>
            <ImageComponent style={{
                backgroundPosition: `${(x / 1.5 + 25).toPrecision(3)}% ${(y / 1.5 + 25).toPrecision(3)}%`,
                backgroundSize: `400% 400%`
            }} coloredBackground={true} />
            <DebugPanel defaultOpen={true}>
                <Header4>Window Properties</Header4>
                <Paragraph>{`x: ${x}%`}</Paragraph>
                <Paragraph>{`y: ${y}%`}</Paragraph>
            </DebugPanel>
        </StyledPage >
    )
}

export default CursorDemo

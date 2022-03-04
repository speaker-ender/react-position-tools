import type { NextPage } from 'next'
import ImageComponent from '../components/image';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Paragraph } from '../global/typography';
import { StyledPage } from './page.styles';
import { useWindowContext } from '../../src/index';
import { IWindowDimensions } from '../../src/window.context';
import { useCallback, useEffect } from 'react';
import { useCursorPercent, useIsCursorActive } from '../../src/index';

const CursorDemo: NextPage = () => {
    const { x, y } = useCursorPercent();
    const isActive = useIsCursorActive();

    return (
        <StyledPage>
            <StyledPanel>
                <Header4>Directions</Header4>
            </StyledPanel>
            <ImageComponent style={{
                backgroundPosition: `${(x / 1.5 + 25).toPrecision(3)}% ${(y / 1.5 + 25).toPrecision(3)}%`,
                backgroundSize: `400% 400%`
            }} coloredBackground={true} />
        </StyledPage >
    )
}

export default CursorDemo

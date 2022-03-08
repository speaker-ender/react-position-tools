import type { NextPage } from 'next'
import ImageComponent from '../components/image';
import { StyledPanel } from '../global/panel.styles';
import { Header4, Paragraph } from '../global/typography';
import { StyledPage } from '../global/page.styles';
import { useElementTracking } from '../../src/index';
import DebugPanel from '../components/debugPanel';
import { useCallback } from 'react';

const TrackedElementDemo: NextPage = () => {
    const { updateElementRef, elementState } = useElementTracking();

    const refCallback = useCallback((element: HTMLElement) => {
        updateElementRef(element);
    }, [])

    return (
        <StyledPage>
            <StyledPanel>
                <Header4>Directions</Header4>
            </StyledPanel>
            <ImageComponent refCallback={refCallback} />
            <DebugPanel defaultOpen={true}>
                <Header4>Element Properties</Header4>
                <Paragraph>{`topPosition(): ${elementState && elementState.top}px`}</Paragraph>
                <Paragraph>{`relativeTopPosition(): ${elementState && elementState.relativeTop}px`}</Paragraph>
                <Paragraph>{`leftPosition(): ${elementState && elementState.left}px`}</Paragraph>
                <Paragraph>{`bottomPosition(): ${elementState && elementState.bottom}px`}</Paragraph>
                <Paragraph>{`relativeBottomPosition(): ${elementState && elementState.relativeBottom}px`}</Paragraph>
                <Paragraph>{`right(): ${elementState && elementState.right}px`}</Paragraph>
                <Paragraph>{`width(): ${elementState && elementState.width}px`}</Paragraph>
                <Paragraph>{`height(): ${elementState && elementState.height}px`}</Paragraph>
            </DebugPanel>
        </StyledPage >
    )
}

export default TrackedElementDemo

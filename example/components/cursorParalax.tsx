import * as React from "react";
import { StyledCursorContainer } from "./cursor-demo.styles";
import ImageComponent from "./image";
import { useCursorTracking, useIsCursorActive, useCursorContext } from '../../src/index';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { StyledCursorParalax, StyledCursorParalaxWrapper } from "./cursorParalax.styles";
import { IPos } from "../../src/cursor.context";
import { Paragraph } from "../global/typography";

interface ICursorParalax {
    style?: React.CSSProperties;
    wireframe?: boolean;
    positionCallback: (activePixels: IPos, activePercent: IPos) => void;
}

const CursorParalax: React.FC<ICursorParalax> = (props) => {
    const { pixels, percent, updateRelativeElement } = useCursorTracking();
    const isActive = useIsCursorActive();
    const [isHover, setIsHover] = useState(false);
    const imageWrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

    const getIsHover = React.useCallback(() => {
        return !(!percent.x || !percent.y || percent.x == 100 || percent.y == 100);
    }, [percent.x, percent.y, pixels.x, pixels.y])

    const updateIsHover = useCallback(() => {
        const newIsHover = getIsHover();
        if (newIsHover !== isHover) {
            setIsHover(newIsHover);
        }
    }, [isHover, setIsHover, getIsHover]);

    useEffect(() => {
        imageWrapperRef.current && updateRelativeElement(imageWrapperRef.current);

        return () => {

        }
    }, [imageWrapperRef.current]);

    useEffect(() => {
        updateIsHover();

        return () => {
        }
    }, [percent.x, percent.y, updateIsHover]);

    useEffect(() => {
        isHover && props.positionCallback(pixels, percent);

        return () => {
        }
    }, [isHover, pixels, percent]);

    const getDecimalPercent = (percentValue: number) => {
        return percentValue / 100;
    }

    const getOffsetXPercent = (percentValue: number) => {
        return (getDecimalPercent(percentValue) * 2) - 1;
    }

    const getOffsetYPercent = (percentValue: number) => {
        return (getDecimalPercent(percentValue) * -2) + 1;
    }

    return (
        <StyledCursorParalaxWrapper wireframe={props.wireframe}>
            <StyledCursorParalax
                wireframe={props.wireframe}
                style={{
                    transform: isHover ? `rotateY(${getOffsetXPercent(percent.x) * 8}deg) rotateX(${getOffsetYPercent(percent.y) * 8}deg) translate3d( 0, -2px, 0 )` : 'rotateY(0deg) rotateX(0deg)'
                }}
                ref={imageWrapperRef}
            >
                <ImageComponent style={{
                    backgroundPosition: isHover ? `${(percent.x / 1.5 + 25).toPrecision(3)}% ${(percent.y / 1.5 + 25).toPrecision(3)}%` : '',
                    transform: isHover ? `scale(0.9)` : `scale(0.8)`
                }} coloredBackground={true} />
                <Paragraph style={{
                    transform: isHover ? `rotateY(${getOffsetXPercent(percent.x) * 5}deg) rotateX(${getOffsetYPercent(percent.y) * 5}deg) translate3d(-50%, -100%, 150px )` : 'translate3d(-50%, -100%, 150px ) rotateY(0deg) rotateX(0deg)'
                }}>Text</Paragraph>
            </StyledCursorParalax>
        </StyledCursorParalaxWrapper>
    )
}

export default CursorParalax;
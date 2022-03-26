import * as React from "react";
import Image from 'next/image';
import enderImage from '../../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { MutableRefObject, useEffect } from "react";

interface IImageComponent {
    style?: React.CSSProperties;
    coloredBackground?: boolean;
    refCallback?: (element: HTMLElement | null) => void;
}

const ImageComponent: React.FC<IImageComponent> = (props) => {

    return (
        <StyledImage style={props.style} coloredBackground={props.coloredBackground} ref={props.refCallback}>
            <Image src={enderImage} layout="responsive" alt="image"></Image>
        </StyledImage>
    )
}

export default ImageComponent;
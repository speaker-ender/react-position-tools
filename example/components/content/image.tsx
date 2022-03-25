import * as React from "react";
import Image from 'next/image';
import enderImage from '../../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";
import { MutableRefObject, useEffect } from "react";

interface IImageComponent {
    style?: React.CSSProperties;
    coloredBackground?: boolean;
    refCallback?: (imageRef: HTMLDivElement) => void;
}

const ImageComponent: React.FC<IImageComponent> = (props) => {
    const imageRef = React.useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        imageRef.current && props.refCallback && props.refCallback(imageRef.current);
    }, [imageRef])

    return (
        <StyledImage style={props.style} coloredBackground={props.coloredBackground} ref={imageRef}>
            <Image src={enderImage} layout="responsive" alt="image"></Image>
        </StyledImage>
    )
}

export default ImageComponent;
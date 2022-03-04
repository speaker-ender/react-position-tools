import * as React from "react";
import Image from 'next/image';
import enderImage from '../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";

interface IImageComponent {
    style?: React.CSSProperties;
    coloredBackground?: boolean;
}

const ImageComponent: React.FC<IImageComponent> = (props) => {

    return (
        <StyledImage style={props.style} coloredBackground={props.coloredBackground}>
            <Image src={enderImage} layout="responsive"></Image>
        </StyledImage>
    )
}

export default ImageComponent;
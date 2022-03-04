import * as React from "react";
import Image from 'next/image';
import enderImage from '../public/ender-trace-best-small.svg'
import { StyledImage } from "./image.styles";


const ImageComponent: React.FC = (props) => {

    return (
        <StyledImage>
            <Image src={enderImage} layout="responsive"></Image>
        </StyledImage>
    )
}

export default ImageComponent;
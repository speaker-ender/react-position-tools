import styled from "styled-components";

interface IStyledImage {
}

export const StyledImage = styled.div<IStyledImage>`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    backdrop-filter: invert();
    transition: background 400ms ease-in-out;
`;
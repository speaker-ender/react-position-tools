import { keyframes } from "styled-components";

export const BASE_ANIMATION_DURATION = 500;
export const BASE_ANIMATION_EASING = 'cubic-bezier()';


export const gradient = keyframes`
  0% {
      background-position: 0% 50%;
  }

  50% {
      background-position: 100% 50%;
  }

  100% {
      background-position: 0% 50%;
  }
`;
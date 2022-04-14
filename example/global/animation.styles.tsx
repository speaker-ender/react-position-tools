import { keyframes } from "styled-components";

export type transitionTypes = "base" | "hover";

export type TransitionStyles = "fade-in" | "fade-up" | "fade-side" | "none";

const BASE_ANIMATION_DURATION = 400;
const HOVER_ANIMATION_DURATION = 250;

const BASE_ANIMATION_EASING = "cubic-bezier(.64,-0.05,.59,1.05)";

const transitionTiming = (type: transitionTypes, multiplier: number = 1) => {
  let timingValue = BASE_ANIMATION_DURATION;

  switch (type) {
    case "hover":
      timingValue = HOVER_ANIMATION_DURATION;
      break;
    default:
      timingValue = BASE_ANIMATION_DURATION;
      break;
  }

  return timingValue * multiplier + "ms";
};

export const transition = {
  hover: `${transitionTiming("hover")} ${BASE_ANIMATION_EASING}`,
  hoverSecondary: `${transitionTiming("hover", 1.2)} ${BASE_ANIMATION_EASING}`,
  appear: `${transitionTiming("hover")} ${BASE_ANIMATION_EASING}`,
  appearSecondary: `${transitionTiming("hover", 1.2)} ${BASE_ANIMATION_EASING}`,
};

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

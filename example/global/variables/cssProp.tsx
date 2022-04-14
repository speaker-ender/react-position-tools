import { css } from "styled-components";
import { media, screenSize } from "./breakpoints";
import { SPACING } from "./spacing";

export const spacingProps = css`
  ${(Object.keys(SPACING) as (keyof typeof SPACING)[])
    .map((spacingPropName) => {
      const currentProp = SPACING[spacingPropName];

      return `--${spacingPropName}: ${currentProp.mobile}; 
        ${(Object.keys(currentProp) as (keyof typeof screenSize)[])
          .map((screenSizeName) => {
            return (
              !!currentProp[screenSizeName] &&
              `@media ${media[screenSizeName]} {
                        --${spacingPropName}: ${currentProp[screenSizeName]};
                    }`
            );
          })
          .join("")}
        `;
    })
    .join("")}
`;

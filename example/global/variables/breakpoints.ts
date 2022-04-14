// Breakpoints for media queries
export const screenSize = {
  mobile: "375px",
  mobileLandscape: "480px",
  tablet: "768px",
  tabletLandscape: "1024px",
  desktop: "1440px",
  desktopLarge: "1920px",
};

export const media = {
  mobile: `(min-width: ${screenSize.mobile})`,
  mobileLandscape: `(min-width: ${screenSize.mobileLandscape})`,
  tablet: `(min-width: ${screenSize.tablet})`,
  tabletLandscape: `(min-width: ${screenSize.tabletLandscape})`,
  desktop: `(min-width: ${screenSize.desktop})`,
  desktopLarge: `(min-width: ${screenSize.desktopLarge})`,
};

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import {
  DARK_THEME,
  getThemePropsString,
  LIGHT_THEME,
} from "../global/theme.styles";
import { setColorsByTheme } from "../helpers/preLoad";

const getCodeToRunOnClient = () => {
  const functionString = String(setColorsByTheme)
    .replace('"DARK_THEME"', JSON.stringify(getThemePropsString(DARK_THEME)))
    .replace('"LIGHT_THEME"', JSON.stringify(getThemePropsString(LIGHT_THEME)));

  return `(${functionString})()`;
};

const MagicScriptTag = () => {
  return (
    <script dangerouslySetInnerHTML={{ __html: getCodeToRunOnClient() }} />
  );
};
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="initial-theme" />
        </Head>
        <MagicScriptTag />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

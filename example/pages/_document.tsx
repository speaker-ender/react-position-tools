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
  LIGHT_THEME,
  setColorsByTheme,
} from "../global/theme.styles";

const MagicScriptTag = () => {
  const functionString = String(setColorsByTheme)
    .replace("'DARK_THEME'", JSON.stringify(DARK_THEME))
    .replace("'LIGHT_THEME'", JSON.stringify(LIGHT_THEME));
  const codeToRunOnClient = `(${functionString})()`;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
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
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <MagicScriptTag />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

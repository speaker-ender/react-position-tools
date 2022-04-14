import type { AppProps } from "next/app";
import Layout from "../global/layout";
// import '../global/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

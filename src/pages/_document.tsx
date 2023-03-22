import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link key="favicon" rel="shortcut icon" href="favicon.ico" />
        <meta key="ogTitle" property="og:title" content="Seed Planting Robot" />
        <meta key="ogImage" property="og:image" content="logo2.jpeg" />
        <meta
          key="ogDescription"
          property="og:description"
          content="Design and build a mobile robot that can navigate to and plant seeds at predetermined locations."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

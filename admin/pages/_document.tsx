import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html dir="rtl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <noscript>
          برای اجرای این برنامه باید جاوا اسکریپت را فعال کنید.
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

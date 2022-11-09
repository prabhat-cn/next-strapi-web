/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';

function CustomDocument() {
  return (
    <Html>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        {/* <title>VertiCard by TemplateMo</title> */}

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
        />
        <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/css/templatemo-style.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="assets/js/jquery-3.4.1.min.js"></script>
        <script src="assets/js/jquery.magnific-popup.min.js"></script>
      </body>
    </Html>
  );
}

CustomDocument.getInitialProps = Document.getInitialProps;

CustomDocument.renderDocument = Document.renderDocument;

export default CustomDocument;

import Head from 'next/head';
import '../styles/globals.css';
import Footer from './components/Footer';
import Header from './components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>VertiCard by TemplateMo</title>
      </Head>

      <div className="tm-page-container mx-auto">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;

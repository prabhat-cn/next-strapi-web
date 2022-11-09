import Head from 'next/head';
import '../styles/globals.css';
import Footer from './components/Footer';
import Header from './components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
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

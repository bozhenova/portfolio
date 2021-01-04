import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/shared/Navbar';
import Header from '@/components/shared/Header';
import '@/styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className='portfolio-app'>
      <Navbar />
      {pageProps.appData}
      {Component.name === 'Home' && <Header />}
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

MyApp.getInitialProps = async (context) => {
  const initialProps =
    App.getInitialProps && (await App.getInitialProps(context));
  return { pageProps: { ...initialProps.pageProps, appData: 'Some app data' } };
};

export default MyApp;

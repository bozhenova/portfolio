import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '@/components/shared/Navbar';
import Header from '@/components/shared/Header';
import Footer from '../components/shared/Footer';
import '@/styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === 'Home';

  return (
    <div className='portfolio-app'>
      <AppNavbar />
      {pageProps.appData}
      {isHomePage() && <Header />}
      <div className='container'>
        <Component {...pageProps} />
      </div>
      {isHomePage() && <Footer />}
    </div>
  );
};

export default MyApp;

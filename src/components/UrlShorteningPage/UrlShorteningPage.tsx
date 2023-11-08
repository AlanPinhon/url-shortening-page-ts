import { Navbar } from '../Navbar/Navbar';
import { Header } from '../Header/Header';
import { InfoSection } from '../InfoSection/InfoSection';
import { Footer } from '../Footer/Footer';
import { SloganSection } from '../SloganSection/SloganSection';
import './UrlShorteningPageStyles.css';

export const UrlShorteningPage = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <InfoSection/>
      <SloganSection/>
      <Footer/>
    </>
  )
}
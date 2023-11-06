import { Navbar } from '../Navbar/Navbar';
import { Header } from '../Header/Header';
import { ShortedLink } from '../ShortenLink/ShortedLink';
import { InfoSection } from '../InfoSection/InfoSection';
import { Footer } from '../Footer/Footer';
import { SloganSection } from '../SloganSection/SloganSection';
import './UrlShorteningPageStyles.css';

export const UrlShorteningPage = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <ShortedLink/>
      <InfoSection/>
      <SloganSection/>
      <Footer/>
    </>
  )
}
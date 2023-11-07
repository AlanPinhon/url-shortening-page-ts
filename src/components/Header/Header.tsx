import ImageHeader from '/assets/images/illustration-working.svg';
import './Header.css';

export const Header = () => (
  <section id="header" className="container header">

    <div className="info-header">
      <h1 className='slogan'>More than just shorter links</h1>
      <p className='text-header'>Build your brand's recognition and get detailed insights 
      on how your links are performing.</p>
      <a className='btn-link btn-header' href="#">Get Started</a>
    </div>

    <div className="image-header">
      <img src={ImageHeader} alt="img_hero"/>
    </div>

  </section>
)
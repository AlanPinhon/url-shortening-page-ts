import ImageHeader from '/assets/images/illustration-working.svg';

export const Header = () => (
  <section id="header" className="header">

    <div className="info-header">
      <h1>More than just shorter links</h1>
      <p>Build your brand's recognition and get detailed insights 
      on how your links are performing.</p>
      <li><a className='nav-btn-link' href="">Get Started</a></li>
    </div>

    <div className="image-header">
      <img src={ImageHeader} alt="img_hero"/>
    </div>

  </section>
)
import ShortlyLogo from '/assets/images/logo.svg';
import FacebookLogo from '/assets/images/icon-facebook.svg';
import TwitterLogo from '/assets/images/icon-twitter.svg';
import PinterestLogo from '/assets/images/icon-pinterest.svg';
import InstagramLogo from '/assets/images/icon-instagram.svg';

export const Footer = () => (
  <footer id="footer">

    <div className="links-container">
      <img className='logo-footer' src={ShortlyLogo} alt="shortly_logo"/>

      <nav className="footer-nav">
        <p className="footer-nav-section">Features</p>
        <li><a href="#">Link Shortening</a></li>
        <li><a href="#">Branded Links</a></li>
        <li><a href="#">Analytics</a></li>
      </nav>

      <nav className="footer-nav">
        <p className="footer-nav-section">Resources</p>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Developers</a></li>
        <li><a href="#">Support</a></li>
      </nav>

      <nav className="footer-nav">
        <p className="footer-nav-section">Company</p>
        <li><a href="#">About</a></li>
        <li><a href="#">Our Team</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>                        
      </nav>
      
      <nav className="footer-social-nav">
        <a className="social-link" href="#">
          <img className="icon-social-link" src={FacebookLogo} alt="facebook" />
        </a>                        
        <a className="social-link" href="#">
          <img className="icon-social-link" src={TwitterLogo} alt="twitter" />
        </a>                        
        <a className="social-link" href="#">
          <img className="icon-social-link" src={PinterestLogo} alt="pinterest" />
        </a>                        
        <a className="social-link" href="#">
          <img className="icon-social-link" src={InstagramLogo} alt="instagram" />
        </a>
      </nav>
    </div>
    
  </footer>
)
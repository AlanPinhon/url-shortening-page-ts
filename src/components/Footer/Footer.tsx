import ShortlyLogo from '/assets/images/logo.svg';
import FacebookLogo from '/assets/images/icon-facebook.svg';
import TwitterLogo from '/assets/images/icon-twitter.svg';
import PinterestLogo from '/assets/images/icon-pinterest.svg';
import InstagramLogo from '/assets/images/icon-instagram.svg';
import './FooterStyles.css';

export const Footer = () => (
  <footer id="footer" className="footer">

    <div className="links-container container">
      <img className="logo-footer" src={ShortlyLogo} alt="shortly_logo"/>

      <div className="nav-links-container">

        <nav className="footer-nav-container">
          <p className="footer-nav-section">Features</p>
          <ul>
            <li><a href="#">Link Shortening</a></li>
            <li><a href="#">Branded Links</a></li>
            <li><a href="#">Analytics</a></li>
          </ul>
        </nav>

        <nav className="footer-nav-container">
          <p className="footer-nav-section">Resources</p>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </nav>

        <nav className="footer-nav-container">
          <p className="footer-nav-section">Company</p>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>                        
        </nav>

      </div>
      
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
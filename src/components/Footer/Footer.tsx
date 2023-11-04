import ShortlyLogo from '/assets/images/logo.svg';

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="links-container">
        <img className='logo-footer' src={ShortlyLogo} alt="shortly_logo"/>

        <nav className="footer-nav">
          <p className="footer-nav-section">Features</p>
          <li><a href="">Link Shortening</a></li>
          <li><a href="">Branded Links</a></li>
          <li><a href="">Analytics</a></li>
        </nav>

        <nav className="footer-nav">
          <p className="footer-nav-section">Resources</p>
          <li><a href="">Blog</a></li>
          <li><a href="">Developers</a></li>
          <li><a href="">Support</a></li>
        </nav>

        <nav className="footer-nav">
          <p className="footer-nav-section">Company</p>
          <li><a href="">About</a></li>
          <li><a href="">Our Team</a></li>
          <li><a href="">Careers</a></li>
          <li><a href="">Contact</a></li>                        
        </nav>

        <nav className="footer-social-nav">
          <a className="social-link" href="">
            <img className="icon-social-link" src="" alt="facebook" />
          </a>                        
          <a className="social-link" href="">
            <img className="icon-social-link" src="" alt="twitter" />
          </a>                        
          <a className="social-link" href="">
            <img className="icon-social-link" src="" alt="pinterest" />
          </a>                        
          <a className="social-link" href="">
            <img className="icon-social-link" src="" alt="instagram" />
          </a>
        </nav>

      </div>
    </footer>
  )
}
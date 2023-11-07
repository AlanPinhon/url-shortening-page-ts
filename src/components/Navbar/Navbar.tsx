import ShortlyLogo from '/assets/images/logo.svg';
import './NavbarStyles.css';

export const Navbar = () => (
  <section className="container">
    <nav id="navbar" className="navbar">

      <div className="nav-container left">
        <img src={ShortlyLogo} alt="shortly_logo"/>
        <ul>
          <li><a className='nav-link' href="#">Features</a></li>
          <li><a className='nav-link' href="#">Pricing</a></li>
          <li><a className='nav-link' href="#">Resources</a></li>
        </ul>
      </div>

      <div className="nav-container right">
        <ul className='link-container'>
          <li><a className='nav-link' href="#">Login</a></li>
        </ul>
        <a className='btn-link nav' href="#">Sing Up</a>
      </div>

    </nav>
  </section>
)
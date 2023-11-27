import { useState } from 'react';
import ShortlyLogo from '/assets/images/logo.svg';
import MenuIcon from '/assets/images/bars-solid.svg';
import './NavbarStyles.css';

export const Navbar = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenu = () => {
    setMenuVisible(!isMenuVisible)
  }

  return (
    <section className="nav-section container">
      <nav id="navbar" className="navbar">

        <div className="logo-icon">
          <img src={ShortlyLogo} alt="shortly-logo"/>
        </div>

        <div onClick={handleMenu} className="menu-icon">
          <img src={MenuIcon} alt="menu-icon" />
        </div>
    
        <div className={`nav-container ${isMenuVisible ? 'show' : ''}`}>
          <div className="left">  
            <ul>
              <li><a className='nav-link' href="#">Features</a></li>
              <li><a className='nav-link' href="#">Pricing</a></li>
              <li><a className='nav-link' href="#">Resources</a></li>
            </ul>
          </div>
    
          <div className="right">
            <ul>
              <li><a className='nav-link' href="#">Login</a></li>
            </ul>
            <a className='btn-link nav' href="#">Sing Up</a>
          </div>
        </div>

      </nav>
    </section>
  )
}
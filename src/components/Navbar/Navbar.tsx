import { useState } from 'react';
import ShortlyLogo from '/assets/images/logo.svg';
import MenuIcon from '/assets/images/bars-solid.svg';
import './NavbarStyles.css';

export const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState('');

  const handleMenu = () => {
    if(toggleMenu !== 'show') {
      setToggleMenu('show')
      document.body.style.overflow = 'hidden';
    } else {
      setToggleMenu('');
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <section className="nav-section container">
    <nav id="navbar" className="navbar">

      <div className="logo-icon">
        <img src={ShortlyLogo} alt="shortly_logo"/>
      </div>

      <div onClick={handleMenu} className="menu-icon">
        <img src={MenuIcon} alt="menu-icon" />
      </div>
  
      <div className={`nav-container ${toggleMenu}`}>
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
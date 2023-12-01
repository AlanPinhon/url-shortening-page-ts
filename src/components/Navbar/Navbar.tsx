import { useState } from 'react';
import ShortlyLogo from '/assets/images/logo.svg';
import MenuIcon from '/assets/images/bars-solid.svg';
import './NavbarStyles.css';

export const Navbar = () => {

  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const stopPropagationInMenu = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <section className="nav-section container">
      <div className="menu">

        <div className="logo-icon">
          <img src={ShortlyLogo} alt="shortly-logo"/>
        </div>

        <button onClick={openMenu} className="menu-icon">
          <img src={MenuIcon} alt="menu-icon" />
        </button>

        <div onClick={closeMenu} className={`menu-container ${isMenuVisible ? 'show' : ''}`}>
          <nav onClick={stopPropagationInMenu} className="nav-container">
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
          </nav>
        </div>
    
      </div>
    </section>
  )
}
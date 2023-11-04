import ShortlyLogo from '/assets/images/logo.svg';

export const Navbar = () => (
  <nav id="navbar" className="navbar">

    <div className="nav-container">
      <img src={ShortlyLogo} alt="shortly_logo"/>
      <ul>
        <li><a className='nav-link' href="#">Features</a></li>
        <li><a className='nav-link' href="#">Pricing</a></li>
        <li><a className='nav-link' href="#">Resources</a></li>
      </ul>
    </div>
    
    <div className="nav-container">
      <ul>
        <li><a className='nav-link' href="#">Login</a></li>
        <li><a className='nav-btn-link' href="#">Sing Up</a></li>
      </ul>
    </div>
    
  </nav>
)
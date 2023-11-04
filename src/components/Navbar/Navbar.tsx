import ShortlyLogo from '/assets/images/logo.svg';

export const Navbar = () => {
  return (
    <nav id="navbar" className="navbar">
      <div className="nav-container">
        <img src={ShortlyLogo} alt="shortly_logo"/>
        <ul>
          <li className='nav-link'><a href="#">Features</a></li>
          <li className='nav-link'><a href="#">Pricing</a></li>
          <li className='nav-link'><a href="#">Resources</a></li>
        </ul>
      </div>
      <div className="nav-container">
        <ul>
          <li className='nav-link'><a href="#">Login</a></li>
          <li className='nav-btn-link'><a href="#">Sing Up</a></li>
        </ul>
      </div>
    </nav>
  )
}
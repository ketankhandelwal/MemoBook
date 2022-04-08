import React ,{useEffect}from 'react'
import {Link, useLocation} from "react-router-dom"

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
      <>
    <nav className="Navbar Navbar-expand-lg Navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="Navbar-brand" to="/">iNoteBook</Link>
    <button className="Navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#NavbarSupportedContent" aria-controls="NavbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="Navbar-toggler-icon"></span>
    </button>
    <div className="collapse Navbar-collapse" id="NavbarSupportedContent">
      <ul className="Navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>
      
       
      </ul>
      <form className="d-flex">
        
      <Link class="btn btn-primary mx-2"  to='/login' role="button">Login</Link>
      <Link class="btn btn-primary mx-2" to='/signup' role="button">Signup</Link>
      </form>
    </div>
  </div>
</nav>
</>

  )
  
 
}


export default Navbar
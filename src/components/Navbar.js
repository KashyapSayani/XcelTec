import React, {useEffect} from "react";
import { Link } from 'react-router-dom';

function Navbar(props) {
  

  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           {localStorage.getItem("token") && <>
           <li className="active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
           </>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
        <Link to="/">
        <div>
            <img src="https://github.com/images/modules/logos_page/GitHub-Mark.png" alt="Github Logo" />
            <p>GitHub</p>
        </div>
        </Link>

        <div>
            <Link to="/create"><p>Create Repository</p></Link>
            <Link to="/profile"><p>Profile</p></Link>
        </div>
        
    </nav>
  );
};

export default Navbar;

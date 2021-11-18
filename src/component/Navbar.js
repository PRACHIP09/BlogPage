import React, { useState, useContext} from "react";
import { Route,NavLink , useHistory } from "react-router-dom";
import "./Navbar.css";
import Edit from "./Edit";
import AuthContext  from "./AuthContext";
<Route path='/id/Edit' component={Edit} />
const NavBar = () => {

  let { logout } =useContext(AuthContext);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            DAILY BLOGS
          </NavLink>
         { 
          localStorage.getItem('authToken') ?
          <>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                exact
                to="/Blogs"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                 All Blogs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/MyBlogs"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                My Blogs
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                exact
                to="/Logout"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
                onClick={logout}>
                Logout
              </NavLink>
            </li>
            
           
            
          </ul>
          </>
          :
          <>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Register"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
          </ul>
          </>
          
          
          
        }
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { user, loginWithPopup, isAuthenticated, logout } = useAuth0();

  const [navClass, setNavClass] = useState(false);

  function addNavClass() {
    setNavClass(!navClass);
  }
  // console.log(user);
  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        &lt;R/&gt;
      </Link>

      <ul className={`links ${navClass ? "js-menu-toggle" : ""}`}>
        <div className="link-page">
          <li>
            <NavLink to="/components">
              <i className="fa-brands fa-fulcrum"></i>
              Components
            </NavLink>
          </li>
          <li>
            <NavLink to="/fullpage">
              <i className="fa-brands fa-fulcrum"></i>
              Fullpage
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/components/create">
              <i className="fa-solid fa-desktop"></i>
              Code
            </NavLink>
          </li> */}

          <li>
            <NavLink target="_blank" href="https://www.youtube.com/@rayen-code">
              <i className="fa-brands fa-youtube"></i>
              Youtube
            </NavLink>
          </li>
        </div>

        <div className="link-action">
          {/*  */}
          {!isAuthenticated ? (
            <button className="login-btn log-action" onClick={loginWithPopup}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
            </button>
          ) : (
            <>
              <li>
                <Link to="components/create" className="create-btn">
                  <i className="fa-solid fa-code"></i> <span> Create</span>
                  <div className="star-1">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="star-2">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="star-3">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="star-4">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="star-5">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="star-6">
                    <i className="fa-solid fa-star"></i>
                  </div>
                </Link>
              </li>
              <button
                title="logout"
                className="logout-btn log-action"
                onClick={logout}
              >
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </button>
              <div className="profile-pic" title={`${user.name}`}>
                <img src={`${user.picture}`} alt="" />
              </div>
            </>
          )}
          {/*  */}
        </div>
      </ul>

      <div className="menu-icon" onClick={addNavClass}>
        <i className="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
}

export default Navbar;

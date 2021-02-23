import React, { Fragment, useState } from 'react';

import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authUser';

const Navbar = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const loading = authUser.loading;

  const [showNavbar, setShowNavbar] = useState(false);

  //NAVIGATION BAR HAMBURGER
  function toggleHamburger() {
    const menuBtn = document.querySelector('.menu-btn');
    menuBtn.classList.toggle('open');
    setShowNavbar(false);
  }

  return (
    <Fragment>
      {loading ? (
        <></>
      ) : authUser.isAuthenticated && authUser.user !== null ? (
        <>
          <div
            className="menu-btn"
            onClick={() => {
              toggleHamburger();
              if (showNavbar) {
                setShowNavbar(false);
              } else {
                setShowNavbar(true);
              }
            }}
          >
            <div className="menu-btn__burger"></div>
          </div>
          {showNavbar && (
            <>
              <div className="navigation" data-aos="zoom-in-up">
                <nav className="navigation__nav">
                  <ul className="navigation__list">
                    <li className="navigation__item" data-aos="fade-up">
                      <Link
                        to="/sign-in"
                        className="navigation__item--username"
                      >
                        Hello {authUser.user.firstName}
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link to={`/cart`}>Cart</Link>
                    </li>
                    <li className="navigation__item">
                      <Link to={`/my-suppliers`}>My Favourites</Link>
                    </li>
                    <li className="navigation__item">
                      <Link to={`/messages`}>Messages</Link>
                    </li>
                    <li className="navigation__item">
                      <Link to={`/myorders/${authUser.user._id}`}>
                        My Orders
                      </Link>
                    </li>
                    <li className="navigation__item">
                      <Link
                        to="/"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </>
      ) : (
        <nav className="landing-nav">
          <ul className="landing-nav__list">
            <li className="landing-nav__list--item--login-link">
              <Link to="/sign-in">Login</Link>
            </li>
            <li className="landing-nav__list--item--signup-link">
              <Link to="/sign-up">Signup</Link>
            </li>
          </ul>
        </nav>
      )}
    </Fragment>
  );
};

export default Navbar;

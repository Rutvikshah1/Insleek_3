import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="footer__right">
          <h1 className="footer__right--heading">Insleek</h1>
          <p className="footer__right--para">
            {window.location.href.indexOf('dashboard') > -1
              ? 'We can help you 10x your sales by connecting you to Dropshippers willing to sell your products!'
              : 'Our goal is to connect dropshippers to reliable suppliers from all over india who are ready to deliver your orders on time!'}
          </p>
        </div>

        <div className="footer-group-one">
          <div className="footer__links1">
            <h4 className="footer__links1--heading">FOR USERS</h4>
            <ul className="footer__links1--links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sign-in">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">Signup</Link>
              </li>
            </ul>
          </div>

          <div className="footer__links2">
            <h4 className="footer__links2--heading">FOR SUPPLIERS</h4>
            <ul className="footer__links2--links">
              <li>
                <Link to="/suppliers">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/supplier-register">Signup</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-group-two">
          <div className="footer__links3">
            <h4 className="footer__links3--heading">FOLLOW US</h4>
            <ul className="footer__links3--links">
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
              <li>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=rutvikshah245@gmail.com">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__links4">
            <h4 className="footer__links4--heading">POLICIES</h4>
            <ul className="footer__links4--links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions">Terms and conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;

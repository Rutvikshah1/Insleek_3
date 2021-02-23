import React, { Fragment, useState, useEffect } from 'react';

import './Login.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/authSupplier';

const Login = ({ history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const authSupplier = useSelector((state) => state.authSupplier);
  const isAuthenticated = authSupplier.isAuthenticated;
  const errors = authSupplier.loginErrors;

  const [loadingButton, setLoadingButton] = useState(false);

  let emailErr = '';
  let passwordErr = '';

  if (errors !== null && errors !== undefined) {
    Array.from(errors).forEach((error) => {
      if (error.param === 'email') {
        emailErr = error.msg;
      }
      if (error.param === 'password') {
        passwordErr = error.msg;
      }
      if (error.param !== 'password' && error.param !== 'email' && error.msg) {
        emailErr = error.msg;
        passwordErr = error.msg;
      }
    });
  } else {
    emailErr = '';
    passwordErr = '';
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);

    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    setTimeout(() => {
      history.push('/dashboard');
    }, 2000);
  }

  return (
    <Fragment>
      <section className="login-section">
        <form
          className="login-form"
          onSubmit={(e) => onSubmit(e)}
          autoComplete="off"
        >
          <h1 className="form-group__header">Supplier Login</h1>
          <div className="form-group">
            <h4 className="form-group__title">Enter your email</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Registered Email ID"
              type="email"
              name="email"
              value={email}
              maxLength="50"
              onChange={(e) => onChange(e)}
            />
            <small className="form-group__error">
              {emailErr ? emailErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your password</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Password"
              name="password"
              type="password"
              maxLength="20"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <small className="form-group__error">
              {passwordErr ? passwordErr : ''}
            </small>
          </div>

          <button type="submit" className="__button __square">
            {loadingButton ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              'LOGIN'
            )}
          </button>
          <div>
            New to Insleek ?<Link to="/supplier-register"> Register</Link> Here
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;

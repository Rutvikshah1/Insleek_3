import React, { Fragment, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/authUser';

const LoginUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  const [loadingButton, setLoadingButton] = useState(false);
  const errors = useSelector((state) => state.authUser.loginErrors);

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

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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

  return (
    <Fragment>
      <section className="login-section">
        <form
          className="login-form"
          onSubmit={(e) => onSubmit(e)}
          autoComplete="off"
        >
          <h1 className="form-group__header">User Login</h1>
          <div className="form-group">
            <h4 className="form-group__title">Enter your email</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Registered Email ID"
              error="required"
              type="email"
              maxLength="50"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <small className="form-group__error">{emailErr}</small>
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter your password</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Password"
              error="required"
              name="password"
              type="password"
              maxLength="20"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <small className="form-group__error">{passwordErr}</small>
          </div>

          <button type="submit" className="__square __button">
            {loadingButton ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              'LOGIN'
            )}
          </button>

          <div>
            New to Insleek ?<Link to="/sign-up"> Register</Link> Here
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default LoginUser;

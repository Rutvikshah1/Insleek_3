import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { register } from '../../actions/authUser';

const RegisterUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const isAuthenticated = authUser.isAuthenticated;
  const errors = authUser.registerErrors;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  let firstNameErr = '';
  let lastNameErr = '';
  let emailErr = '';
  let passwordErr = '';
  let phoneErr = '';

  if (errors !== null && errors !== undefined) {
    Array.from(errors).forEach((error) => {
      if (error.param === 'firstName') {
        firstNameErr = error.msg;
      }
      if (error.param === 'lastName') {
        lastNameErr = error.msg;
      }
      if (error.param === 'email') {
        emailErr = error.msg;
      }
      if (error.param === 'phone') {
        phoneErr = error.msg;
      }
      if (error.param === 'password') {
        passwordErr = error.msg;
      }
    });
  } else {
    firstNameErr = '';
    lastNameErr = '';
    emailErr = '';
    passwordErr = '';
    phoneErr = '';
  }

  const { firstName, lastName, email, phone, password } = formData;
  const [loadingButton, setLoadingButton] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };
    dispatch(register(newUser, history));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <section className="signup-section" style={{ paddingTop: '6rem' }}>
        <form
          style={{ marginLeft: '1rem' }}
          onSubmit={(e) => onSubmit(e)}
          autoComplete="off"
        >
          <h1 className="form-group__header">Register User</h1>
          <div className="form-group">
            <h4 className="form-group__title">Enter your firstname</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Firstname"
              error="required"
              maxLength="15"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{firstNameErr}</small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your lastname</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Lastname"
              error="required"
              name="lastName"
              maxLength="15"
              type="text"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{lastNameErr}</small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your email</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Email"
              error="required"
              type="email"
              maxLength="50"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{emailErr}</small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your phone number</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Phone Number"
              error="required"
              type="number"
              name="phone"
              maxLength="10"
              value={phone}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{phoneErr}</small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your password</h4>
            <input
              className="form-group__text"
              placeholder="Set A New Password"
              error="required"
              type="password"
              name="password"
              maxLength="20"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{passwordErr}</small>
          </div>

          <button type="submit" className="__square __button">
            {loadingButton ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              'SIGN UP'
            )}
          </button>

          <div>
            Have an account ?<Link to="/sign-in"> Login</Link> Here.
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default RegisterUser;

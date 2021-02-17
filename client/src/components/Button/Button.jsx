import React, { Fragment } from 'react';
import './Button.scss';
import { Link } from 'react-router-dom';

const Button = ({ text, link }) => {
  return (
    <Fragment>
      <Link to={link} className="__button">
        {text}
      </Link>
    </Fragment>
  );
};

export default Button;

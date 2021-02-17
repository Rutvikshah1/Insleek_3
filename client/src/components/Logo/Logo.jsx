import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import './Logo.scss';

const Logo = ({ color }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div
        className={`logo`}
        onClick={() => {
          history.push('/');
        }}
      >
        <h1 className={`logo__name-${color}`}>Insleek</h1>
      </div>
    </Fragment>
  );
};

export default Logo;

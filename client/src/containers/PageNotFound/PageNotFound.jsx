import React from 'react';
import noPage from './../../assests/svg/noPage.svg';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <section className="no-page">
      <div>
        <img src={noPage} className="no-page__svg" alt="404-Page-Not-Found" />
      </div>
      <h6>Oops! Page Not Found.</h6>
    </section>
  );
};

export default PageNotFound;

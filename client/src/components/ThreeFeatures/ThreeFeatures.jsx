import React, { Fragment } from 'react';
import './ThreeFeatures.scss';

const ThreeFeatures = ({ data }) => {
  return (
    <Fragment>
      <h1 style={{ textAlign: 'center' }} data-aos="fade-down">
        {data[3].heading}
      </h1>
      <div className="threefeatures">
        <div className="feature" data-aos="fade-up">
          <img className="feature__icon" src={data[0].image} alt="icon" />
          <h4 className="feature__title">{data[0].title}</h4>
          <p className="feature__text">{data[0].description}</p>
        </div>
        <div className="feature" data-aos="fade-up">
          <img className="feature__icon" src={data[1].image} alt="icon" />
          <h4 className="feature__title">{data[1].title}</h4>
          <p className="feature__text">{data[1].description}</p>
        </div>
        <div className="feature" data-aos="fade-up">
          <img className="feature__icon" src={data[2].image} alt="icon" />
          <h4 className="feature__title">{data[2].title}</h4>
          <p className="feature__text">{data[2].description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default ThreeFeatures;

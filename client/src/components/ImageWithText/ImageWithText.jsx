import React from 'react';

import Button from '../Button/Button';
import './ImageWithText.scss';

const ImageWithText = ({ mainimage, subimage }) => {
  return (
    <div className="imagewithtext" data-aos="fade-up">
      <div className="imagewithtext__image">
        <img
          src={mainimage}
          srcSet={`${subimage} 300w, ${mainimage} 600w`}
          sizes="(max-width: 1200px) 300px, 600px"
          alt="img"
        />
      </div>
      <div className="imagewithtext__text">
        <h1 className="imagewithtext__text--primary">
          A fast and easy way to sell your products online
        </h1>
        <p className="imagewithtext__text--secondary">
          We will promote you to our retailers on Insleek, who will market your
          products to their customers. They will bring you the sales you desire,
          while you can enjoy creating new products.
        </p>
        <Button text="GET STARTED" link="/supplier-register" />
      </div>
    </div>
  );
};

export default ImageWithText;

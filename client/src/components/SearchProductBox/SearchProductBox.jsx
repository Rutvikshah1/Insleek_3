import React from 'react';
import { Link } from 'react-router-dom';
import './SearchProductBox.scss';

const SearchProductBox = ({ product }) => {
  return (
    <div className="search-product-box__product" data-aos="fade-up">
      <Link to={`/product/${product._id}`} className="search-product-box__link">
        <img
          className="search-product-box__image"
          src={`/uploads/${product.image}`}
          alt=""
        />
        <div className="search-product-box__title">{product.title}</div>
        <div className="search-product-box__review">
          <strong className="search-product-box__star">
            {product.rating} <i class="fas fa-star"></i>
          </strong>{' '}
          ({product.numReviews} reviews)
        </div>
        <div>Rs. {product.price}</div>
      </Link>
    </div>
  );
};

export default SearchProductBox;

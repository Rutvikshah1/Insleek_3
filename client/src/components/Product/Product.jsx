import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { createProductReview, viewProduct } from '../../actions/product';
import './Product.scss';
import { loadUser } from '../../actions/authUser';
import { addToCart, resetCart } from '../../actions/cart';
import Rating from '../Rating/Rating';
import Spinner from '../../components/Spinner/Spinner';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../actions/types';

const Product = ({ match, history }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const user = useSelector((state) => state.authUser.user);
  const cart = useSelector((state) => state.cart);

  const product = productState.product;
  const loading = productState.loading;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(loadUser());
    dispatch(viewProduct(match.params.id));
    window.scrollTo(0, 0);
  }, [dispatch, match, successProductReview]);

  const {
    title,
    description,
    price,
    requiredQty,
    numReviews,
    image,
    // eslint-disable-next-line
    product: productInfo,
  } = product;

  const [qty, setQty] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [cartAlert, setCartAlert] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <Fragment>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {' '}
            <Link
              to={`/supplier/${product.supplier}`}
              className="visit-store __button __square"
            >
              VISIT STORE - CHAT WITH SUPPLIER
            </Link>
            <div className="product">
              <div className="product__part-one">
                <img
                  src={`/uploads/${image}`}
                  className="product__image"
                  alt="ProductImage"
                />
              </div>
              <div className="product__part-two">
                <div>{title} </div>
                <h1>Rs. {price}</h1>

                <div className="search-product-box__review">
                  <strong className="search-product-box__star">
                    {product.rating} <i className="fas fa-star"></i>
                  </strong>{' '}
                  ({numReviews} reviews)
                </div>
                <p style={{ color: '#6c63ff' }}>
                  Minimum {requiredQty} units required
                </p>
                <form>
                  <label htmlFor="quantity">Enter the quantity</label>
                  <br />
                  <input
                    className="form-group__text"
                    type="number"
                    value={qty}
                    id="quantity"
                    name="quantity"
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  />
                  <br />
                  <small className="form-group__error">
                    {requiredQty > qty && qty !== null
                      ? `Please order more than ${requiredQty} units`
                      : ''}
                  </small>
                </form>

                <div>
                  <button
                    disabled={requiredQty > qty || qty === null}
                    className="__button __square"
                    onClick={() => {
                      if (
                        cart.cartItems.length > 0 &&
                        cart.cartItems[0].supplier !== product.supplier
                      ) {
                        setCartAlert(true);
                      } else {
                        dispatch(addToCart(product._id));
                        history.push(`/cart/${match.params.id}?qty=${qty}`);
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="product-description">{description}</div>
              </div>
            </div>
            {/* CART ALERT */}
            {cartAlert && (
              <>
                <div className="cart-alert-background">
                  <div className="cart-alert-box" data-aos="fade-up">
                    <h3>
                      oops! You Already have items in your cart from other
                      supplier.
                    </h3>
                    <div className="cart-alert-box__buttons">
                      <button
                        className="__button __square"
                        onClick={() => {
                          dispatch(resetCart());
                          dispatch(addToCart(product._id));
                          history.push(`/cart/${match.params.id}?qty=${qty}`);
                        }}
                      >
                        Clear cart and add this item
                      </button>
                      <button
                        className="__button __square"
                        onClick={() => {
                          setCartAlert(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* ***************************REVIEWS*********************** */}
            <div className="rating">
              <h1>User Reviews</h1>
              <div className="rating__average">
                <Rating
                  value={product.rating}
                  text={` ${numReviews} reviews`}
                />
              </div>

              {product.reviews !== undefined &&
                product.reviews.length === 0 && (
                  <p className="no-reviews">No Reviews</p>
                )}
              <div>
                {product.reviews !== undefined &&
                  product.reviews.length !== 0 &&
                  product.reviews.map((review, index) => (
                    <div key={index} className="review-card" data-aos="fade-up">
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                      <p>
                        {moment(review.createdAt).format(
                          'MMMM Do YYYY, h:mm a'
                        )}
                      </p>
                      <strong>- Review by {review.name}</strong>
                    </div>
                  ))}
              </div>

              <br />
              {user ? (
                <form action="/" onSubmit={submitHandler}>
                  <div className="write-review">
                    <select
                      className="form-group__dropdown"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>

                    <br />
                    <br />
                    <textarea
                      id="rating"
                      className="form-group__textarea"
                      name=""
                      rows="4"
                      cols="50"
                      placeholder="Start typing.."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="__button __square"
                      value="Submit"
                      disabled={loadingProductReview}
                    />
                  </div>
                </form>
              ) : (
                <p className="login-for-review">
                  Please <Link to="/sign-in">Login</Link> To Write Review
                </p>
              )}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

export default Product;

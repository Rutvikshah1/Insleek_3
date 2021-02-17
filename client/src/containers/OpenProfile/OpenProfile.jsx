import React, { useEffect, Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, viewProduct, clearProducts } from '../../actions/product';
import { Link, useHistory } from 'react-router-dom';
import { openProfile, profileVisitCount } from '../../actions/searchResult';
import './OpenProfile.scss';
import Spinner from '../../components/Spinner/Spinner';
import { sendMessage } from '../../actions/chat';
import audioTone from './../../assests/message_tone.mp3';

const OpenProfile = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const side = 'user';
  const userHasRead = true;
  const supplierHasRead = false;

  useEffect(() => {
    dispatch(openProfile(match.params.id));
    dispatch(getProducts(match.params.id));
    dispatch(profileVisitCount(match.params.id));
    dispatch(clearProducts());
    window.scrollTo(0, 0);
  }, []);

  const searchResult = useSelector((state) => state.searchResult);
  const authUser = useSelector((state) => state.authUser);
  const products = useSelector((state) => state.product.products);
  const supplier = searchResult.supplier;
  let loading = searchResult.loading;

  const openProduct = (id, history) => {
    dispatch(viewProduct(id, history, match));
    history.push(`/supplier/${supplier._id}/product/${id}`);
  };

  const playSound = () => {
    let newAudio = new Audio(audioTone);
    newAudio.play();
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="section-open-profile">
            <div className="adminstore">
              <img
                src={`/uploads/${supplier.companyImage}`}
                className="adminstore__image"
                alt=""
              />
              <div className="adminstore__about-company">
                <h1>{supplier.companyName}</h1>
                <div>
                  <i class="fas fa-map-marker-alt"></i> {supplier.city},{' '}
                  {supplier.state}
                </div>
                <div>{supplier.aboutCompany}</div>
              </div>

              <div>
                <h1 className="supplier-niche">Supplier Niche</h1>
                {supplier.niche} <br /> {supplier.numberOfProducts} products
              </div>

              <div>
                <h1 className="supplier-info">Contact Information</h1>
                <div style={{ textTransform: 'lowercase' }}>
                  <i class="fas fa-envelope"></i> {supplier.email} <br />
                  <i class="fas fa-phone"></i> {supplier.phone}
                </div>
              </div>
              <br />
            </div>

            {/* Products */}

            <div className="store-product-wrapper">
              {products.length === 0 && (
                <h2 className="product-nofound">No Products Found</h2>
              )}

              {products.map((product) => {
                return (
                  <div
                    className="search-product-box__product"
                    data-aos="fade-up"
                  >
                    <Link
                      onClick={(e) => openProduct(product._id, history)}
                      className="search-product-box__link"
                    >
                      <img
                        className="search-product-box__image"
                        src={`/uploads/${product.image}`}
                        alt=""
                      />
                      <div className="search-product-box__title">
                        {product.title}
                      </div>
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
              })}
            </div>
            {/* Chatbox */}

            <div
              className="chatbox"
              onClick={() => {
                if (authUser.isAuthenticated) {
                  setShowPopup(true);
                  playSound();
                } else {
                  history.push('/sign-in');
                }
              }}
            >
              Chat With This Supplier
            </div>
            {showPopup && (
              <>
                <div className="cart-alert-background">
                  <div className="cart-alert-box" data-aos="fade-up">
                    <p className="chatbox__title">
                      Say Hello To Supplier{' '}
                      <span role="img" aria-label="smile-emoji">
                        😊
                      </span>
                    </p>
                    <input
                      type="text"
                      className="form-group__text"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <p className="chatbox__info">
                      You will find sent/new messages in messages section of
                      Menu
                    </p>
                    <div className="alert-buttons">
                      <button
                        className="__button __square"
                        disabled={message === ''}
                        onClick={() => {
                          dispatch(
                            sendMessage(
                              authUser.user._id,
                              supplier._id,
                              message,
                              side,
                              userHasRead,
                              supplierHasRead
                            )
                          );
                          setShowPopup(false);
                        }}
                      >
                        Send
                      </button>
                      <button
                        className="__button __square"
                        onClick={() => {
                          setShowPopup(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </Fragment>
  );
};

export default OpenProfile;

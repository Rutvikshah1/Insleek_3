import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addToFavourite, openProfile } from '../../actions/searchResult';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../actions/product';
import './SearchResultBox.scss';

const SearchResultBox = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const supplierTagOne = ['Fast Delivery', 'Free Shipping'];
  const supplierTagTwo = ['Verified Supplier', 'Very Responsive'];

  useEffect(() => {
    dispatch(getProducts(props.supplier._id));
  }, [props.supplier._id]);

  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  return (
    <Fragment>
      <div className="main-box">
        <div
          className="displaybox"
          data-aos="fade-up"
          onClick={() => dispatch(openProfile(props.supplier._id, history))}
        >
          <div className="displaybox__image">
            <img src={`/uploads/${props.supplier.companyImage}`} alt="" />
          </div>
          <div className="displaybox__part-one">
            <div>
              <b>{props.supplier.companyName}</b>
            </div>
            <div>
              <i className="fas fa-map-marker-alt"></i> {props.supplier.city},{' '}
              {props.supplier.state}
            </div>
          </div>
          <div className="displaybox__part-two">
            <div className="displaybox__part-two--left">
              <strong>{props.supplier.niche}</strong>
              <div>
                <b>{props.supplier.numberOfProducts}</b> products
              </div>
            </div>

            <div className="displaybox__part-two--right">
              <div>
                <i className="fas fa-check-circle"></i>{' '}
                {
                  supplierTagOne[
                    Math.floor(Math.random() * supplierTagOne.length)
                  ]
                }
              </div>
              <div>
                <i className="fas fa-check-circle"></i>{' '}
                {
                  supplierTagTwo[
                    Math.floor(Math.random() * supplierTagTwo.length)
                  ]
                }
              </div>
            </div>
          </div>{' '}
          <Link
            to="#"
            onClick={(e) => {
              if (isAuthenticated) {
                dispatch(addToFavourite(props.supplier._id));
                e.stopPropagation();
              } else {
                history.push('/sign-in');
                e.stopPropagation();
              }
            }}
          >
            <i className="far fa-heart"></i>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResultBox;

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import {
  getFavouriteSuppliers,
  removeFavouriteSuppliers,
} from '../../actions/searchResult';
import Spinner from '../../components/Spinner/Spinner';
import './FavouriteSuppliers.scss';

const FavouriteSuppliers = ({ history }) => {
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResult);
  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  useEffect(() => {
    dispatch(getFavouriteSuppliers());
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <section>
        <div>
          <div className="userside-block">
            <h4 className="userside-block__title">My Suppliers</h4>
          </div>

          {searchResult.favouriteSuppliers.length === 0 && (
            <h3 className="userside-block__noinfo">
              You will find Your Favourite Suppliers Here!
            </h3>
          )}
          {searchResult.loading ? (
            <Spinner />
          ) : (
            searchResult.favouriteSuppliers.map((supplier, index) => (
              <React.Fragment key={index}>
                <div className="main-box" key={index}>
                  <div
                    className="displaybox"
                    data-aos="fade-up"
                    onClick={() => history.push(`/supplier/${supplier._id}`)}
                  >
                    <img
                      src={`/uploads/${supplier.companyImage}`}
                      className="displaybox__image"
                      alt=""
                    />
                    <div className="displaybox__part-one">
                      <b>{supplier.companyName}</b>

                      <div>
                        <i className="fas fa-map-marker-alt"></i>{' '}
                        {supplier.city}, {supplier.state}
                      </div>
                      <div className="">{supplier.niche}</div>
                    </div>
                    <div className="displaybox__part-two"></div>
                    <div
                      onClick={(e) => {
                        dispatch(removeFavouriteSuppliers(supplier._id));
                        e.stopPropagation();
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default FavouriteSuppliers;

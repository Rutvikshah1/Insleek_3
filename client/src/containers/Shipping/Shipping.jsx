import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cart';
import './Shipping.scss';

const Shipping = ({ history }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [custName, setCustName] = useState(shippingAddress.custName);
  const [custPhone, setCustPhone] = useState(shippingAddress.custPhone);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        custName,
        custPhone,
      })
    );
    history.push('/payment');
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <div className="userside-block">
          <h4 className="userside-block__title">Delivery Address</h4>
        </div>

        <div className="shipping-form">
          <div className="form-group">
            <h4 className="form-group__title">Enter customer name</h4>
            <input
              className="form-group__text"
              placeholder="Enter Customer Name"
              type="text"
              name="city"
              required
              value={custName}
              onChange={(e) => setCustName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter customer phone number</h4>
            <input
              className="form-group__text"
              placeholder="Enter Customer Phone number"
              type="number"
              name="phone"
              maxLength="10"
              required
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter Delivery Address</h4>
            <textarea
              className="form-group__text"
              name="address"
              rows="3"
              cols="50"
              maxLength="200"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            >
              {address}
            </textarea>
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter city name</h4>
            <input
              className="form-group__text"
              placeholder="Enter City Name"
              type="text"
              name="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter Postal Code</h4>
            <input
              className="form-group__text"
              placeholder="Enter Postal Code"
              type="text"
              name="postalCode"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h4 className="form-group__title">Enter your country</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Country"
              type="text"
              name="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button type="submit" className="__button __square">
            Continue
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Shipping;

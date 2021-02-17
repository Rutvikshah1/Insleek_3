import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cart';
import './Payment.scss';

const Payment = ({ history }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <React.Fragment>
      <section>
        <form onSubmit={submitHandler}>
          <div className="userside-block">
            <h4 className="userside-block__title">Select Payment Method</h4>
          </div>

          <div className="payment-checkbox">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Paytm">Cash On Delivery</label>
            <br />

            <input
              type="radio"
              id="online"
              name="paymentMethod"
              value="online-payment"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="online">Online Payment</label>
            <br />
            <button type="submit" className="__button __square">
              Continue
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Payment;

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetCart } from '../../actions/cart';
import { createOrder } from '../../actions/order';
import './PlaceOrder.scss';

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const paymentMethod = cart.paymentMethod;
  const {
    address,
    city,
    postalCode,
    state,
    custName,
    custPhone,
  } = cart.shippingAddress;

  const dispatch = useDispatch();

  const supplier = cart.cartItems[0].supplier;

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 299 ? 0 : 40;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.GSTPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.GSTPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.order);
  const { order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        GSTPrice: cart.GSTPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        supplier: supplier,
        customerInfo: { custName, custPhone },
      })
    );

    setTimeout(() => {
      dispatch(resetCart());
    }, 3000);
  };
  return (
    <div>
      <div className="userside-block">
        <h4 className="userside-block__title">Place Order</h4>
      </div>

      <div className="payment-info">
        <div>
          <p>
            <strong> Customer Name</strong> : {custName}
          </p>
          <p>
            <strong> Customer Phone</strong> : {custPhone}
          </p>
        </div>
        <br />
        <p>
          <strong>Delivery Address</strong>
          <br />
          {address}, {city}, {postalCode}, {state}
        </p>
        <hr />
        <br />
        <h4>Payment Method</h4>
        <p>
          {paymentMethod} <Link to="payment">Change</Link>
        </p>
        <hr />
        <br />

        <h4>Order Items</h4>
        {cart.cartItems.length === 0 ? (
          <p>Cart Is Empty</p>
        ) : (
          <div>
            {cart.cartItems.map((item, index) => (
              <div key={index}>
                <div>
                  <Link to={`/product/${item.product}`}>
                    <img
                      src={`/uploads/${item.image}`}
                      height="35px"
                      width="35px"
                      alt=""
                    />
                    <br /> {item.title}
                  </Link>
                </div>
                <div>
                  {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}
        <br />
        <div>Order Summary</div>
        <p>
          <strong>Items Rs. </strong>
          {cart.itemsPrice}
        </p>
        <p>
          <strong>Shipping </strong>
          {cart.shippingPrice ? `Rs. ${cart.shippingPrice}` : 'FREE'}
        </p>
        <p>
          <strong>GST Rs. </strong>
          {cart.GSTPrice}
        </p>
        <p>
          <strong>Total Rs. </strong>
          {cart.totalPrice}
        </p>
        <button
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
          className="__button __square"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;

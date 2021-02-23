import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../actions/order';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import './Order.scss';

const Order = ({ match, history }) => {
  // let currentPathname = null;
  // let currentSearch = null;
  // useEffect(() => {
  //   history.listen((newLocation, action) => {
  //     if (action === 'PUSH') {
  //       if (
  //         newLocation.pathname !== currentPathname ||
  //         newLocation.search !== currentSearch
  //       ) {
  //         // Save new location
  //         currentPathname = newLocation.pathname;
  //         currentSearch = newLocation.search;

  //         // Clone location object and push it to history
  //         history.push({
  //           pathname: newLocation.pathname,
  //           search: newLocation.search,
  //         });
  //       }
  //     } else {
  //       // Send user back if they try to navigate back
  //       history.go(1);
  //     }
  //   });
  // }, []);

  const orderID = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(orderID));
  }, []);

  const order = useSelector((state) => state.order);
  const { loading } = order;
  const shippingAddress = order.orderDetails.shippingAddress;

  return (
    <React.Fragment>
      <div className="userside-block">
        <h4 className="__title-confirmation">Order Confirmation</h4>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="order-confirmation">
          <h2>Order ID : {orderID}</h2>
          <br />

          <p>
            <strong>Customer Name</strong> :{' '}
            {order.orderDetails.customerInfo.custName}{' '}
          </p>
          <p>
            <strong>Customer Phone</strong> :{' '}
            {order.orderDetails.customerInfo.custPhone}{' '}
          </p>
          <br />

          <p>
            <strong>Delivery Address</strong>
            <br />
            {shippingAddress.address}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.state}
          </p>
          <br />

          <h2>Ordered Items</h2>
          <div>
            {order.orderDetails.orderItems.map((item, index) => (
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
          <br />
          <p>
            <strong>Items Price : </strong>Rs. {order.orderDetails.itemsPrice}
          </p>
          <p>
            <strong>Shipping Charge : </strong>
            {order.orderDetails.shippingPrice
              ? `Rs. ${order.orderDetails.shippingPrice}`
              : 'FREE'}
          </p>
          <p>
            <strong>GST tax : </strong>Rs. {order.orderDetails.GSTPrice}
          </p>
          <p>
            <strong>Final Price : </strong>Rs. {order.orderDetails.totalPrice}{' '}
          </p>
          <strong>Payment Method : {order.orderDetails.paymentMethod}</strong>
          <br />
          <p>Thanks For Your Order!</p>
          <br />
        </div>
      )}
      <div className="back-to-home">
        <Button text="Back To Home" link="/" />
      </div>
    </React.Fragment>
  );
};

export default Order;

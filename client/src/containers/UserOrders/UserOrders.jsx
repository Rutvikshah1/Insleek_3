import React from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './UserOrders.scss';
import { getUserOrders } from '../../actions/order';
import Spinner from '../../components/Spinner/Spinner';

const UserOrders = ({ match }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  useEffect(() => {
    dispatch(getUserOrders(match.params.id));
  }, []);

  const { loading } = order;

  return (
    <React.Fragment>
      {isAuthenticated && <Navbar />}
      <section>
        <div>
          <div className="userside-block">
            <h4 className="userside-block__title">My Orders</h4>
          </div>

          {order.userOrders.length === 0 && (
            <h3 className="userside-block__noinfo">
              You will find Your placed orders Here
            </h3>
          )}
          {loading ? (
            <Spinner />
          ) : (
            order.userOrders.map((item, index) => (
              <div key={index} className="userorders__box" data-aos="fade-up">
                <div>
                  <div className="order-status-tag">{item.orderStatus}</div>
                  <strong>ORDER ID </strong>
                  <br />
                  <span
                    className="view-order"
                    onClick={() => {
                      window.open(`/order/${item._id}`);
                    }}
                  >
                    {item._id}
                  </span>
                  <br />
                  {moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}
                </div>
                <br />
                <p>
                  <strong>Customer Name</strong> : {item.customerInfo.custName}
                  <br />
                  <strong>Customer Phone</strong> :{' '}
                  {item.customerInfo.custPhone}
                  <br />
                  <br />
                  <strong>Delivery Address</strong>
                  <br />
                  {item.shippingAddress.address}, {item.shippingAddress.city},{' '}
                  {item.shippingAddress.postalCode},{' '}
                  {item.shippingAddress.state}
                </p>
                <br />

                <h3>ORDERED ITEMS</h3>

                {item.orderItems.map((product, index) => (
                  <div key={index}>
                    <div>
                      <Link to={`/product/${product.product}`}>
                        <img
                          src={`/uploads/${product.image}`}
                          height="35px"
                          width="35px"
                          alt=""
                        />
                        <br />
                        {product.title}
                      </Link>
                    </div>

                    <div>
                      <strong>QUANTITY : </strong>
                      {product.qty}
                      <br />
                      <strong>PRICE : </strong>Rs. {product.price}
                    </div>
                  </div>
                ))}
                <br />

                <div>
                  <strong>ITEMS PRICE :</strong>Rs. {item.itemsPrice}
                  <br />
                  <strong>GST PRICE :</strong>Rs. {item.GSTPrice}
                  <br />
                  <strong>SHIPPING PRICE : </strong>
                  {item.shippingPrice ? `Rs. ${item.shippingPrice}` : 'FREE'}
                  <br />
                  <strong>TOTAL PRICE :</strong>Rs. {item.totalPrice}
                  <br />
                  <strong>AMOUNT : {item.isPaid ? 'Paid' : 'Not Paid'}</strong>
                  <br />
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default UserOrders;

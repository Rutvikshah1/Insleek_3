import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSupplierOrders, updateProductStatus } from '../../../actions/order';
import { useState } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import './Orders.scss';
import moment from 'moment';

const Orders = () => {
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.authSupplier.supplier);

  const [status, setStatus] = useState('Ordered');
  const [statusID, setStatusID] = useState('');

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getSupplierOrders(supplier._id));
  }, [getSupplierOrders]);

  const order = useSelector((state) => state.order);
  const loading = order.loading;

  const onChangeSelection = (e, id) => {
    setStatus(e.target.value);
    setStatusID(id);
  };
  const updateStatus = (id) => {
    dispatch(updateProductStatus(status, id));
  };

  return (
    <React.Fragment>
      <div className="no-orders">
        {order.supplierOrders.length === 0 &&
          'No New Orders, come after some time!!'}
        {loading ? (
          <h2>
            <Spinner />
          </h2>
        ) : (
          order.supplierOrders.map((item, index) => (
            <div key={index} className="top-space" data-aos="fade-up">
              <h2>Order ID : {item._id}</h2>
              <strong>Order Placed By (Name)</strong> : {item.user.firstName}{' '}
              {item.user.lastName}
              <br />
              <strong>Phone</strong> : {item.user.phone}
              <br />
              {moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}
              <br />
              <br />
              <div className="order-status-tag">{item.orderStatus}</div>
              <p>
                <strong>Customer Name</strong> : {item.customerInfo.custName}
                <br />
                <strong>Customer Phone</strong> : {item.customerInfo.custPhone}
                <br />
                <strong>Delivery Address</strong>
                <br />
                {item.shippingAddress.address}, {item.shippingAddress.city},{' '}
                {item.shippingAddress.postalCode},{' '}
                {item.shippingAddress.country}
              </p>
              <br />
              <h2>Ordered Items</h2>
              <div>
                {item.orderItems.map((item, index) => (
                  <div key={index}>
                    <div
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={() => {
                        window.open(`/product/${item.product}`);
                      }}
                    >
                      <img
                        src={`/uploads/${item.image}`}
                        height="35px"
                        width="35px"
                        alt=""
                      />
                      <br /> {item.title}
                    </div>
                    <div>
                      {item.qty} x Rs. {item.price} = Rs.{' '}
                      {item.qty * item.price}
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <br />
              <p>
                <strong>Items Price : </strong>Rs. {item.itemsPrice}
              </p>
              <p>
                <strong>Shipping Charge : </strong>
                {item.shippingPrice ? `Rs. ${item.shippingPrice}` : 'FREE'}
              </p>
              <p>
                <strong>GST tax : </strong>Rs. {item.GSTPrice}
              </p>
              <p>
                <strong>Final Price : </strong>Rs. {item.totalPrice}{' '}
              </p>
              <strong>Payment Method : {item.paymentMethod}</strong>
              <br />
              <br />
              {/* .......... */}
              <div>
                <strong>AMOUNT </strong>
                {item.isPaid ? <p>Paid</p> : <p>Not Paid</p>}
              </div>
              <br />
              <div>
                <strong>
                  CURRENT ORDER STATUS : <b>{item.orderStatus}</b>
                </strong>

                <br />
                <select
                  name="status"
                  className="form-group__dropdown"
                  value={item._id === statusID && status}
                  onChange={(e) => {
                    onChangeSelection(e, item._id);
                  }}
                >
                  {item.orderStatus === 'Ordered' ? (
                    <>
                      {' '}
                      <option value="Ordered">Ordered</option>
                      <option value="Under Process">Under Process</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  ) : item.orderStatus === 'Under Process' ? (
                    <>
                      {' '}
                      <option value="Under Process">Under Process</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  ) : item.orderStatus === 'Shipped' ? (
                    <>
                      {' '}
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </>
                  ) : (
                    <>
                      <option value="Delivered">Delivered</option>
                    </>
                  )}
                </select>
                <span>Once changed, you can't update it again</span>
                <br />
                <button
                  className="__button __square"
                  onClick={() => {
                    updateStatus(item._id);
                  }}
                >
                  Change Status
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Orders;

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cart';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import './Cart.scss';

const Cart = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    window.scroll(0, 0);
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <React.Fragment>
      {isAuthenticated && <Navbar />}
      <section>
        <div className="userside-block">
          <h4 className="userside-block__title">My Cart</h4>
        </div>
        <div className="userside-block__noinfo">
          {cartItems.length === 0 && <h4>Oops! Your Cart is Empty.</h4>}
          {cartItems.length !== 0 && (
            <React.Fragment>
              <h2>
                SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                ITEMS
                <br />
                Total Rs.{' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h2>
              <div className="shipping-button">
                <Button text="Proceed To Shipping" link="/shipping" />
              </div>
            </React.Fragment>
          )}
        </div>

        <React.Fragment>
          {cartItems.map((item) => {
            return [
              <div className="userside-product" data-aos="fade-up">
                <img
                  src={`/uploads/${item.image}`}
                  height="55px"
                  width="55px"
                  alt=""
                />
                <br />
                <Link to={`/product/${item.product}`} key={item.title}>
                  {item.title}
                </Link>
                <div>Rs. {item.price}</div>
                <div
                  className="userside-product__removeitem"
                  onClick={() => {
                    dispatch(removeFromCart(item.product));
                    history.push('/cart');
                  }}
                >
                  Remove Product
                </div>
                <form>
                  <label htmlFor="quantity">Select Qty</label>
                  <br />
                  <select
                    className="userside-product__dropdown"
                    name="quantity"
                    id="quantity"
                    value={item.qty}
                    onChange={(e) => {
                      dispatch(addToCart(item.product, Number(e.target.value)));
                    }}
                  >
                    {item.countInStock < 10
                      ? [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      : [...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                  </select>
                </form>
                <br />
              </div>,
            ];
          })}
        </React.Fragment>
      </section>
    </React.Fragment>
  );
};

export default Cart;

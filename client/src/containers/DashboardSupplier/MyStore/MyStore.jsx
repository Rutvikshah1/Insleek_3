import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  deleteProduct,
  editProduct,
  viewProduct,
} from '../../../actions/product';
import './MyStore.scss';
import { Link } from 'react-router-dom';
import { toastSuccessful } from '../../../utils/Toast';

const MyStore = () => {
  const dispatch = useDispatch();
  const popup = document.getElementById('popup1');

  // **********************************EDIT PRODUCT**********************

  const [productId, setProductId] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    countInStock: '',
    price: '',
  });

  let product = useSelector((state) => state.product.product);

  useEffect(() => {
    window.scroll(0, 0);
    setFormData({
      title: !product.title ? '' : product.title,
      price: !product.price ? '' : product.price,
      description: !product.description ? '' : product.description,
      countInStock: !product.countInStock ? '' : product.countInStock,
    });
  }, [productId, product]);

  const { title, description, countInStock, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editProduct(formData, productId));
    dispatch(getProducts(supplier_info._id));
  };

  // **********************************

  const authSupplier = useSelector((state) => state.authSupplier);
  const products = useSelector((state) => state.product.products);

  const loading = authSupplier.loading;
  const supplier_info = authSupplier.supplier;

  useEffect(() => {
    dispatch(getProducts(supplier_info._id));
  }, [supplier_info._id]);

  const {
    companyName,
    city,
    niche,
    email,
    phone,
    state,
    companyImage,
    aboutCompany,
  } = supplier_info;

  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  function copyToClipboard(e) {
    e.preventDefault();
    const copyText = document.getElementById('copy-input');
    copyText.select();
    document.execCommand('copy');
    toastSuccessful('Copied to clipboard');
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section>
            <div className="adminstore">
              <img
                src={`/uploads/${companyImage}`}
                className="adminstore__image"
                alt=""
              />
              <div className="adminstore__about-company">
                <h1>{companyName}</h1>
                <div>
                  <i class="fas fa-map-marker-alt"></i> {city}, {state}
                </div>
                <div>{aboutCompany}</div>
              </div>

              <div>
                <h1>Niche</h1>
                {niche} <br /> {products.length} products
              </div>

              <div>
                <h1>Contact</h1>
                <i class="fas fa-envelope"></i>{' '}
                <span className="adminstore__email">{email}</span> <br />
                <i class="fas fa-phone"></i> {phone}
              </div>
              <br />
            </div>

            {/* ..........................PRODUCTS.................. */}
            <div className="display-product-box__product">
              {products.map((product) => {
                const id = product._id;
                return (
                  <div className="store-product" data-aos="fade-up">
                    <div key={id} className="store-product__content">
                      <input
                        type="text"
                        id="copy-input"
                        value={`http://localhost:3000/product/${product._id}`}
                      />
                      <Link to={`/product/${product._id}`} target="_blank">
                        <i class="fas fa-eye"></i>
                      </Link>
                      {document.queryCommandSupported('copy') && (
                        <Link to="/#" onClick={copyToClipboard}>
                          <i class="far fa-copy"></i>
                        </Link>
                      )}
                      <img
                        className="store-product--image"
                        src={`/uploads/${product.image}`}
                        alt="product"
                      />
                      <br />
                      <div className="store-product--name">{product.title}</div>
                      <h1 className="store-product--price">
                        Rs. {product.price}
                      </h1>
                      <div className="store-product--countInStock">
                        {product.countInStock} units available
                      </div>

                      <div className="store-product--buttons">
                        <a
                          href="#popup1"
                          onClick={(e) => {
                            setProductId(id);
                            dispatch(viewProduct(id));
                            popup.classList.remove('hidePopup');
                          }}
                        >
                          EDIT
                        </a>
                        <Link to="#" onClick={(e) => removeProduct(id)}>
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EDIT PRODUCT */}

            <div id="popup1" className="overlay">
              <div className="popup">
                {Object.keys(product).length !== 0 ? (
                  <>
                    <h2>Update Product</h2>
                    {/*  eslint-disable-next-line */}
                    <a className="close" href="#">
                      &times;
                    </a>
                    <div className="content">
                      <form
                        className="form-edit-product"
                        onSubmit={(e) => onSubmit(e)}
                        autoComplete="off"
                      >
                        <div className="form-group">
                          <h4 className="form-group__title">Product Title</h4>
                          <input
                            className="form-group__text"
                            error="required"
                            name="title"
                            maxLength="80"
                            type="text"
                            value={title}
                            onChange={(e) => onChange(e)}
                          />
                          <small className="form-group__error">
                            {!title && 'Required'}
                          </small>
                        </div>

                        <div className="form-group">
                          <h4 className="form-group__title">
                            Product Description
                          </h4>
                          <textarea
                            name="description"
                            placeholder="Enter Product Description"
                            error="required"
                            value={description}
                            rows="6"
                            className="form-group__textarea"
                            cols="50"
                            maxLength="500"
                            onChange={(e) => onChange(e)}
                          >
                            {description}
                          </textarea>
                          <small className="form-group__error">
                            {!description && 'Required'}
                          </small>
                        </div>

                        <div className="form-group">
                          <h4 className="form-group__title">Count In Stock</h4>
                          <input
                            className="form-group__text"
                            error="required"
                            name="countInStock"
                            type="text"
                            min="1"
                            value={countInStock}
                            onChange={(e) => onChange(e)}
                          />
                          <small className="form-group__error">
                            {!countInStock && 'Required'}
                          </small>
                        </div>

                        <div className="form-group">
                          <h4 className="form-group__title">Product Price</h4>
                          <input
                            className="form-group__text"
                            error="required"
                            name="price"
                            type="number"
                            maxLength="5"
                            value={price}
                            onChange={(e) => onChange(e)}
                          />
                          <small className="form-group__error">
                            {!price && 'Required'}
                          </small>
                        </div>

                        <input
                          type="submit"
                          value="UPDATE"
                          className="__square __button"
                          onClick={() => {
                            popup.classList.add('hidePopup');
                          }}
                        />
                      </form>
                    </div>
                  </>
                ) : (
                  <p>Loading..</p>
                )}
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyStore;

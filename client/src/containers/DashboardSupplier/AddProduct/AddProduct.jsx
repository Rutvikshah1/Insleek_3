import React, { Fragment, useEffect, useState } from 'react';
import { addProduct } from '../../../actions/product';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import './AddProduct.scss';

const AddProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    requiredQty: 5,
  });

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  if (image.indexOf(' ') !== -1) {
    alert('plese remove space');
  }

  const uploadFileHandler = async (e) => {
    const receivedFile = e.target.files[0];

    if (receivedFile.name.indexOf(' ') !== -1) {
      const ele = document.getElementById('img-space-error');
      ele.innerHTML = 'Please Remove Space From Image Name';
      return;
    }

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const instanceOfblob = await imageCompression(receivedFile, options);
    const file = new File([instanceOfblob], `${receivedFile.name}`, {
      type: receivedFile.type,
    });

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const { title, description, price, requiredQty } = formData;
  const [loadingButton, setLoadingButton] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    formData.image = image;

    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);

    dispatch(addProduct(formData));

    setFormData({ title: '', description: '', price: '' });
    setImage('');
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
        id="product-form"
        className="addProduct"
      >
        <div className="form-group">
          <h4 className="form-group__title">Enter Product Title</h4>
          <input
            className="form-group__text"
            placeholder="Enter Product Title"
            error="required"
            type="text"
            maxLength="80"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <br />
          {!title && (
            <small className="form-group__error">Required Field</small>
          )}
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Enter Product Description</h4>
          <textarea
            name="description"
            placeholder="Enter Product Description"
            error="required"
            className="form-group__textarea"
            value={description}
            rows="6"
            cols="50"
            maxLength="500"
            onChange={(e) => onChange(e)}
          >
            {description}
          </textarea>
          <br />
          {!description && (
            <small className="form-group__error">Required Field</small>
          )}
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Enter required minimum quantity</h4>
          <input
            className="form-group__text"
            placeholder="Enter required minimum quantity"
            error="required"
            type="number"
            min="1"
            name="requiredQty"
            value={requiredQty}
            onChange={(e) => onChange(e)}
          />
          <br />
          {!requiredQty && (
            <small className="form-group__error">Required Field</small>
          )}
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Enter Product Price</h4>
          <input
            className="form-group__text"
            placeholder="Enter Product Price"
            error="required"
            type="number"
            name="price"
            maxLength="5"
            value={price}
            onChange={(e) => onChange(e)}
          />
          <br />
          {!price && (
            <small className="form-group__error">Required Field</small>
          )}
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Upload Product Image</h4>
          <input
            className="form-group__text"
            type="text"
            placeholder="Uploaded Image Title"
            disabled
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          {!image && (
            <small className="form-group__error" id="img-space-error">
              Required Field
            </small>
          )}
          <br />
          <p>Make sure image name has no space in it.</p>
          {uploading && <h4>Loading...</h4>}

          <input
            type="file"
            className="custom-file-input"
            name="images"
            multiple
            onChange={uploadFileHandler}
          />
        </div>

        <button type="submit" className="__button __square">
          {loadingButton ? (
            <i className="fa fa-spinner fa-spin"></i>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </Fragment>
  );
};

export default AddProduct;

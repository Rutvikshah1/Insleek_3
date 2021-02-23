import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  updateProfile,
} from '../../../actions/authSupplier';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import './EditProfile.scss';

const EditProfile = () => {
  const states = [
    'Andhrapradesh',
    'Arunachalpradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadranagarhaveli',
    'Daman&Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachalpradesh',
    'Jammu&Kashmir',
    'Jharkhan',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhyapradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Pondicherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamilnadu',
    'Tripura',
    'Uttarpradesh',
    'Uttarakhand',
    'Westbengal',
  ];

  const niches = [
    'Appliances ',
    'Games',
    'Arts, Crafts, & Sewing',
    'Automotive Parts & Accessories',
    'Baby',
    'Beauty & Personal Care',
    'Cell Accessories',
    'Clothing, Shoes and Jewelry',
    'Collectibles & Fine Art',
    'Computers Accessories',
    'Electronics',
    'Garden & Outdoor',
    'Handmade',
    'Health, Household & Baby Care',
    'Home & Kitchen',
    'Industrial & Scientific',
    'Luggage & Travel Gear',
    'Musical Instruments',
    'Office Products',
    'Pet Supplies',
    'Premium Beauty',
    'Sports & Outdoors',
    'Tools & Home Improvement',
    'Toys & Games',
    'Video Games',
  ];

  const dispatch = useDispatch();

  const supplier = useSelector((state) => state.authSupplier.supplier);
  const [loadingButton, setLoadingButton] = useState(false);

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    aboutCompany: '',
    phone: '',
    city: '',
    state: '',
    niche: '',
    GST: '',
    website: '',
    companyName: '',
  });

  useEffect(() => {
    window.scroll(0, 0);
    getCurrentProfile(supplier._id);

    setFormData({
      firstName: !supplier.firstName ? '' : supplier.firstName,
      lastName: !supplier.lastName ? '' : supplier.lastName,
      email: !supplier.email ? '' : supplier.email,
      phone: !supplier.phone ? '' : supplier.phone,
      GST: !supplier.GST ? '' : supplier.GST,
      city: !supplier.city ? '' : supplier.city,
      state: !supplier.state ? '' : supplier.state,
      aboutCompany: !supplier.aboutCompany ? '' : supplier.aboutCompany,
      website: !supplier.website ? '' : supplier.website,
      niche: !supplier.niche ? '' : supplier.niche,
      companyName: !supplier.companyName ? '' : supplier.companyName,
    });

    setImage(supplier.companyImage);
  }, []);

  const {
    firstName,
    lastName,
    email,
    phone,
    GST,
    city,
    aboutCompany,
    website,
    state,
    niche,
    companyName,
  } = formData;

  const uploadFileHandler = async (e) => {
    const receivedFile = e.target.files[0];

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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);

    formData.companyImage = image;
    dispatch(updateProfile(formData, supplier._id));
  };

  return (
    <Fragment>
      <form
        className="form-supplier"
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
      >
        <div className="form-group">
          <h4 className="form-group__title">Your firstname</h4>
          <input
            className="form-group__text"
            error="required"
            maxLength="15"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => onChange(e)}
          />
          <br />
          <small className="form-group__error">
            {!firstName && 'Required Field'}
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your lastname</h4>
          <input
            className="form-group__text"
            error="required"
            name="lastName"
            maxLength="15"
            type="text"
            value={lastName}
            onChange={(e) => onChange(e)}
          />
          <br />
          <small className="form-group__error">
            {!lastName && 'Required Field'}
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">About your company</h4>
          <textarea
            className="form-group__textarea"
            error="required"
            rows="6"
            cols="50"
            maxLength="100"
            name="aboutCompany"
            value={aboutCompany}
            onChange={(e) => onChange(e)}
          ></textarea>
          <br />
          <small className="form-group__error">
            {!aboutCompany && 'Required Field'}
          </small>
        </div>

        <h4 className="form-group__title">Your State</h4>
        <select
          name="state"
          value={state}
          className="form-group__dropdown"
          onChange={(e) => onChange(e)}
        >
          {states.map((x, index) => (
            <option key={index} value={x}>
              {x}
            </option>
          ))}
        </select>

        <div className="form-group">
          <h4 className="form-group__title">Your city</h4>
          <input
            className="form-group__text"
            error="required"
            type="text"
            name="city"
            maxLength="30"
            value={city}
            onChange={(e) => onChange(e)}
          />
          <br />
          <small className="form-group__error">
            {!city && 'Required Field'}
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your Niche</h4>
          <select
            className="form-group__dropdown"
            name="niche"
            value={niche}
            onChange={(e) => onChange(e)}
          >
            {niches.map((x, index) => (
              <option key={index} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your website</h4>
          <input
            className="form-group__text"
            error="required"
            type="text"
            name="website"
            maxLength="40"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <br />
          <small className="form-group__error" style={{ color: 'green ' }}>
            (Optional)
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your company name</h4>
          <input
            className="form-group__text"
            error="required"
            type="text"
            name="companyName"
            maxLength="20"
            value={companyName}
            onChange={(e) => onChange(e)}
          />
          <br />
          <small className="form-group__error">
            {!companyName && 'Required Field'}
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Change Company Image</h4>
          <input
            className="form-group__text"
            type="text"
            disabled
            placeholder="Image Title"
            name="image"
            value={image}
            onChange={(e) => onChange(e)}
          />

          {uploading && <h4>Loading...</h4>}
          <p>Make sure image name has no space in it.</p>
          <input
            className="custom-file-input"
            type="file"
            name="images"
            multiple
            onChange={uploadFileHandler}
          />
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your GST number</h4>
          <input
            className="form-group__text"
            error="required"
            type="text"
            name="GST"
            value={GST}
            onChange={(e) => onChange(e)}
            disabled
          />
          <br />
          <small className="form-group__error" style={{ color: 'green ' }}>
            You can't change your GST number
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your email</h4>
          <input
            className="form-group__text"
            error="required"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            disabled
          />
          <br />
          <small className="form-group__error" style={{ color: 'green ' }}>
            You can't change your email address
          </small>
        </div>

        <div className="form-group">
          <h4 className="form-group__title">Your phone number</h4>
          <input
            className="form-group__text"
            error="required"
            type="text"
            maxLength="50"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
            disabled
          />
          <br />
          <small className="form-group__error" style={{ color: 'green ' }}>
            You can't change your phone number
          </small>
        </div>

        <button type="submit" className="__square __button">
          {loadingButton ? <i className="fa fa-spinner fa-spin"></i> : 'UPDATE'}
        </button>
      </form>
    </Fragment>
  );
};

export default EditProfile;

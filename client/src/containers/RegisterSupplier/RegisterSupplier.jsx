import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterSupplier.scss';
import { register } from '../../actions/authSupplier';
import imageCompression from 'browser-image-compression';

const RegisterSupplier = ({ history }) => {
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
    'Appliances',
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // IMAGE UPLOAD
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

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

  const dispatch = useDispatch();

  const authSupplier = useSelector((state) => state.authSupplier);
  const isAuthenticated = authSupplier.isAuthenticated;
  const errors = authSupplier.registerErrors;

  let firstNameErr = '';
  let lastNameErr = '';
  let emailErr = '';
  let passwordErr = '';
  let aboutCompanyErr = '';
  let phoneErr = '';
  let cityErr = '';
  let stateErr = '';
  let nicheErr = '';
  let GSTErr = '';
  let companyNameErr = '';

  if (errors !== null && errors !== undefined) {
    Array.from(errors).forEach((error) => {
      if (error.param === 'firstName') {
        firstNameErr = error.msg;
      }
      if (error.param === 'lastName') {
        lastNameErr = error.msg;
      }
      if (error.param === 'email') {
        emailErr = error.msg;
      }
      if (error.param === 'password') {
        passwordErr = error.msg;
      }
      if (error.param === 'aboutCompany') {
        aboutCompanyErr = error.msg;
      }
      if (error.param === 'phone') {
        phoneErr = error.msg;
      }
      if (error.param === 'city') {
        cityErr = error.msg;
      }
      if (error.param === 'state') {
        stateErr = error.msg;
      }
      if (error.param === 'niche') {
        nicheErr = error.msg;
      }
      if (error.param === 'GST') {
        GSTErr = error.msg;
      }
      if (error.param === 'companyName') {
        companyNameErr = error.msg;
      }
    });
  } else {
    firstNameErr = '';
    lastNameErr = '';
    emailErr = '';
    passwordErr = '';
    aboutCompanyErr = '';
    phoneErr = '';
    cityErr = '';
    stateErr = '';
    nicheErr = '';
    GSTErr = '';
    companyNameErr = '';
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    aboutCompany: '',
    phone: '',
    city: '',
    state: '',
    niche: '',
    GST: '',
    website: '',
    companyName: '',
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    GST,
    city,
    aboutCompany,
    website,
    state,
    niche,
    companyName,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
    }, 2000);

    let companyImage;
    if (image === '') {
      companyImage = 'default.jpg';
    } else {
      companyImage = image;
    }
    const newSupplier = {
      firstName,
      lastName,
      email,
      password,
      aboutCompany,
      phone,
      city,
      niche,
      GST,
      state,
      website,
      companyName,
      companyImage,
    };

    dispatch(register(newSupplier));
  };

  if (isAuthenticated) {
    setTimeout(() => {
      history.push('/dashboard');
    }, 1000);
  }

  return (
    <Fragment>
      <section className="signup-section">
        <div>
          <p className="signup-section__left">
            Become a Insleek Supplier by filling in the registration form. Once
            you submit the form, our onboarding team will get in touch with you.
            <br />
            <br />
            <span>
              You must follow the below norms to become our supplier. <br />{' '}
              <br />
              <i className="fas fa-check-circle"></i> You should have the real
              stocks of the products you upload in your store.
              <br />
              <i className="fas fa-check-circle"></i> Your price should be very
              economical as we usually allow our resellers to sell at higher
              profits.
              <br /> <i className="fas fa-check-circle"></i> In the courier you
              send, you should include only the invoice we send you and paste
              the shipping labels we send you.
              <br /> <i className="fas fa-check-circle"></i> You shall include a
              nominal courier charge costs in the product itself as we encourage
              our resellers to do free shipping to their end-customers.
            </span>
          </p>
        </div>

        <form
          onSubmit={(e) => onSubmit(e)}
          autoComplete="off"
          style={{ marginLeft: '1rem' }}
        >
          <h1 className="form-group__header">Supplier Registration</h1>

          <div className="form-group">
            <h4 className="form-group__title">Enter your firstname</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Firstname"
              error="required"
              name="firstName"
              maxLength="15"
              type="text"
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {firstNameErr ? firstNameErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your lastname</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Lastname"
              error="required"
              name="lastName"
              type="text"
              maxLength="15"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {lastNameErr ? lastNameErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your email</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Email"
              error="required"
              type="email"
              maxLength="50"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {emailErr ? emailErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your password</h4>
            <input
              className="form-group__text"
              placeholder="Set A New Password"
              error="required"
              type="password"
              maxLength="20"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {passwordErr ? passwordErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter about your company</h4>
            <textarea
              className="form-group__textarea"
              placeholder="Enter Brief About Your Company"
              error="required"
              rows="6"
              cols="50"
              maxLength="300"
              name="aboutCompany"
              value={aboutCompany}
              onChange={(e) => onChange(e)}
            ></textarea>
            <br />
            <small className="form-group__error">
              {aboutCompanyErr ? aboutCompanyErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your phone number</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Phone Number"
              error="required"
              maxlength="10"
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {phoneErr ? phoneErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Select State</h4>
            <select
              className="form-group__dropdown"
              name="state"
              value={state}
              onChange={(e) => onChange(e)}
            >
              <option value="">SELECT</option>
              {states.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <br />
            <small className="form-group__error">
              {stateErr ? stateErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your city</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your City"
              error="required"
              type="text"
              maxLength="30"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {cityErr ? cityErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Choose Your Niche</h4>
            <select
              className="form-group__dropdown"
              name="niche"
              value={niche}
              onChange={(e) => onChange(e)}
            >
              <option value="">SELECT</option>
              {niches.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <br />
            <small className="form-group__error">
              {nicheErr ? nicheErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your GST number</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your GST Number"
              error="required"
              maxlength="15"
              type="number"
              name="GST"
              value={GST}
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">{GSTErr ? GSTErr : ''}</small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your website</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Website URL"
              error="required"
              type="text"
              name="website"
              maxLength="40"
              value={website}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Enter your company name</h4>
            <input
              className="form-group__text"
              placeholder="Enter Your Company Name"
              error="required"
              type="text"
              name="companyName"
              value={companyName}
              maxlength="20"
              onChange={(e) => onChange(e)}
            />
            <br />
            <small className="form-group__error">
              {companyNameErr ? companyNameErr : ''}
            </small>
          </div>
          <div className="form-group">
            <h4 className="form-group__title">Upload Company Image</h4>
            <input
              disabled
              className="form-group__text"
              type="text"
              placeholder="Uploaded Image.."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p>Make sure image name has no space in it.</p>
            {uploading && <h4>Loading...</h4>}

            <input
              className="custom-file-input"
              type="file"
              name="images"
              multiple
              onChange={uploadFileHandler}
            />
          </div>
          <button type="submit" className="__square __button">
            {loadingButton ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              'SIGN UP'
            )}
          </button>
          <div>
            Have an account ?<Link to="/login"> Login</Link> Here.
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default RegisterSupplier;

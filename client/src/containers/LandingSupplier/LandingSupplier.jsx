import React, { useEffect } from 'react';
import Button from '../../components/Button/Button';
import ImageWithText from '../../components/ImageWithText/ImageWithText';
import ThreeFeatures from '../../components/ThreeFeatures/ThreeFeatures';
import store from '../../assests/svg/029-open.svg';
import money from '../../assests/svg/041-money.svg';
import bag from '../../assests/svg/008-bag.svg';
import deliveries from '../../assests/svg/deliveries.svg';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSupplier } from '../../actions/authSupplier';
import './LandingSupplier.scss';

const LandingSupplier = () => {
  const threeFeatures = [
    {
      image: store,
      title: 'Create Your online shop',
      description:
        'create Your online store on our platform by providing information about your business. we will verify and approve it within 48 business hours.',
    },
    {
      image: bag,
      title: 'List Products on Insleek',
      description:
        'Once your account is approved, then you are eligible to add products in your store from the dashboard.',
    },
    {
      image: money,
      title: 'Fulfill orders and Receive Earnings',
      description:
        'Users can find you by your loaction, niche or by searching product title & You will be notified whenever you receive new orders. Payments are directly deposited to your bank account within a few days of shipping the orders.',
    },
    { heading: 'Start earning in 3 simple steps' },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadSupplier());
  }, []);

  const isAuthenticated = useSelector(
    (state) => state.authSupplier.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <header className="header">
        <div className="header__text">
          <h1 className="header__text--primary" data-aos="fade-up">
            Sell directly to India's Largest Dropshipping Platform
          </h1>
          <p className="header__text--secondary">
            Expand your distribution channel and increase sales by getting your
            products showcased on thousands of online stores.
          </p>
          <Button text="GET STARTED" link="/supplier-register" />
        </div>

        <img src={deliveries} className="header__image" alt="Supplier" />
      </header>

      <ImageWithText />

      <ThreeFeatures data={threeFeatures} />

      <div className="block">
        <h4 className="block__title" data-aos="fade-down">
          10x your business with insleek today!
        </h4>
        <Button text="GET STARTED" link="/supplier-register" />
      </div>
    </div>
  );
};

export default LandingSupplier;

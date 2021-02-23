import React, { Fragment, useEffect, useState } from 'react';
import './LandingUser.scss';
import Logo from '../../components/Logo/Logo';
import SearchResult from '../SearchResult/SearchResult';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultBox from '../../components/SearchResultBox/SearchResultBox';
import Navbar from '../../components/Navbar/Navbar';
import { clearSearch, getAllSuppliers } from '../../actions/searchResult';
import SearchProductBox from '../../components/SearchProductBox/SearchProductBox';
import Button from '../../components/Button/Button';
import delivery from '../../assests/svg/delivery.svg';
import statistics from '../../assests/svg/statistics.svg';
import received from '../../assests/svg/received.svg';
import ThreeFeatures from '../../components/ThreeFeatures/ThreeFeatures';

const LandingUser = () => {
  const threeFeatures = [
    {
      image: delivery,
      title: 'Find by location',
      description:
        'you can search state names and find suppliers from particular location.',
    },
    {
      image: statistics,
      title: 'Find by Niche',
      description:
        'you can search and find suppliers by using particular niche names.',
    },
    {
      image: received,
      title: 'Find products by keywords',
      description:
        'You can search and find various products by keywords as well.',
    },
    { heading: 'How this works ?' },
  ];

  const searchResult = useSelector((state) => state.searchResult);
  const isAuthenticated = useSelector(
    (state) => state.authUser.isAuthenticated
  );

  const [showMore, setShowMore] = useState(false);
  let arrOfSuppliers = [];

  if (searchResult.suppliers.length >= 1 && !showMore) {
    arrOfSuppliers = searchResult.suppliers.slice(0, 1);
  } else if (searchResult.suppliers.length > 1 && showMore) {
    arrOfSuppliers = searchResult.suppliers;
  } else {
    arrOfSuppliers = searchResult.suppliers;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllSuppliers());
    dispatch(clearSearch());
  }, []);

  //Changing Text By Using Loop
  const example = [
    'Looking for New suppliers ?',
    'Delay in Shipping ?',
    'High product prices ?',
    'No response from supplier ?',
  ];

  function textSequence(i) {
    if (example.length > i) {
      setTimeout(function () {
        if (document.getElementById('sequence')) {
          document.getElementById(
            'sequence'
          ).innerHTML = `<p data-aos="fade-up">${example[i]}</p>`;
          textSequence(++i);
        } else {
          return;
        }
      }, 3000);
    } else if (example.length === i) {
      textSequence(0);
    }
  }

  useEffect(() => {
    textSequence(0);
  }, []);

  return (
    <Fragment>
      <Logo color="white" />
      <Navbar />
      <header className="header-user">
        <div className="header-user__wrapper">
          <h1 className="header-user__wrapper--text" id="sequence">
            High Returns ?
          </h1>
          <p className="header-user__wrapper--para">
            Find reliable suppliers for your business near you and all over
            india, surprisingly it's FREE!
          </p>
          <SearchResult />
          <p className="header-user__wrapper--para">
            We are continuously adding new suppliers everyday!
          </p>
        </div>
      </header>
      {searchResult.suppliers.length > 0 ? (
        <h1 className="search-result-title">Showing Available Suppliers</h1>
      ) : searchResult.products.length > 0 ? (
        <h1 className="search-result-title">
          Showing Products based on your search
        </h1>
      ) : (
        ''
      )}
      {arrOfSuppliers.map((supplier, index) => {
        return <SearchResultBox supplier={supplier} key={index} />;
      })}
      {arrOfSuppliers.length >= 1 && showMore === false && (
        <button
          type="submit"
          className="__button __square show-more"
          onClick={() => {
            setShowMore(true);
          }}
        >
          Show More
        </button>
      )}
      <div className="search-product-box">
        {searchResult.products.map((product, index) => {
          return <SearchProductBox product={product} key={index} />;
        })}
      </div>
      <div style={{ margin: '4rem 0' }}>
        <ThreeFeatures data={threeFeatures} />
      </div>
      {!isAuthenticated && (
        <>
          <div className="block-user">
            <h4 className="block-user__title" data-aos="fade-down">
              Join more than 1000 ambitious entrepreneurs who are already
              dropshipping online
            </h4>
            <Button text="GET STARTED" link="/sign-up" />
          </div>
        </>
      )}
    </Fragment>
  );
};

export default LandingUser;

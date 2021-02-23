import React, { useState } from 'react';

import { Link, BrowserRouter, Switch } from 'react-router-dom';
import './DashboardSupplier.scss';
import MyStore from './MyStore/MyStore';
import AddProduct from './AddProduct/AddProduct';
import EditProfile from './EditProfile/EditProfile';
import { logout } from '../../actions/authSupplier';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../../utils/PrivateRoute';
import Orders from './Orders/Orders';
import Messages from './Messages/Messages';
import Product from '../../components/Product/Product';
import Spinner from '../../components/Spinner/Spinner';
import DashboardHome from './DashboardHome/DashboardHome';
import { clearProducts } from '../../actions/product';

const routes = [
  {
    path: `/dashboard/store`,
    exact: true,
    sidebar: () => MyStore,
    main: () => <MyStore />,
  },
  {
    path: `/dashboard`,
    exact: true,
    sidebar: () => DashboardHome,
    main: () => <DashboardHome />,
  },
  {
    path: '/dashboard/add-product',
    exact: true,
    sidebar: () => AddProduct,
    main: () => <AddProduct />,
  },
  {
    path: '/dashboard/edit-profile',
    exact: true,
    sidebar: () => EditProfile,
    main: () => <EditProfile />,
  },
  {
    path: '/dashboard/orders',
    exact: true,
    sidebar: () => Orders,
    main: () => <Orders />,
  },
  {
    path: '/dashboard/messages',
    exact: true,
    sidebar: () => Messages,
    main: () => <Messages />,
  },
  {
    path: '/dashboard/store/product',
    exact: true,
    sidebar: () => MyStore,
    main: () => <Product />,
  },
];

const DashboardSupplier = () => {
  const loading = useSelector((state) => state.authSupplier.loading);
  const dispatch = useDispatch();

  //NAVIGATION BAR HAMBURGER
  const [showNavbar, setShowNavbar] = useState(false);

  function toggleHamburger() {
    const menuBtn = document.querySelector('.menu-btnn');
    const nav = document.getElementById('navbar');
    menuBtn.classList.toggle('open');
    nav.classList.toggle('navVisible');
  }

  return (
    <BrowserRouter>
      <div
        className="menu-btnn"
        onClick={() => {
          toggleHamburger();
          if (showNavbar) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }
        }}
      >
        <div className="menu-btnn__burger"></div>
      </div>

      <div className="dashboard-supplier">
        <nav id="navbar" className="navVisible">
          <ul className="dashboard-supplier__links">
            <li>
              <Link to="/dashboard" onClick={() => toggleHamburger()}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/store" onClick={() => toggleHamburger()}>
                My Store
              </Link>
            </li>
            <li>
              <Link to="/dashboard/messages" onClick={() => toggleHamburger()}>
                Messages
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-product"
                onClick={() => toggleHamburger()}
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/edit-profile"
                onClick={() => toggleHamburger()}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders" onClick={() => toggleHamburger()}>
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearProducts());
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {routes.map((route, index) => (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.sidebar />}
            />
          ))}
        </Switch>

        {loading ? (
          <Spinner />
        ) : (
          <div className="dashboard-supplier__component">
            <Switch>
              {routes.map((route, index) => (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.main}
                />
              ))}
            </Switch>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default DashboardSupplier;

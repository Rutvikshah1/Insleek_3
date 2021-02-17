import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';
import LandingSupplier from '../LandingSupplier/LandingSupplier';
import Login from '../Login/Login';
import SearchResultBox from '../../components/SearchResultBox/SearchResultBox';
import RegisterSupplier from '../RegisterSupplier/RegisterSupplier';
import Footer from '../../components/Footer/Footer';
import DashboardSupplier from '../DashboardSupplier/DashboardSupplier';
import { BrowserRouter } from 'react-router-dom';
import PrivateRoute from '../../utils/PrivateRoute';
import PrivateRouteUser from '../../utils/PrivateRouteUser';
import LandingUser from '../LandingUser/LandingUser';
import Logo from '../../components/Logo/Logo';
import OpenProfile from '../OpenProfile/OpenProfile';
import LoginUser from '../LoginUser/LoginUser';
import RegisterUser from '../RegisterUser/RegisterUser';
import Cart from '../../containers/Cart/Cart';
import Shipping from '../Shipping/Shipping';
import Payment from '../Payment/Payment';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import Product from '../../components/Product/Product';
import Order from '../Order/Order';
import UserOrders from '../UserOrders/UserOrders';
import FavouriteSuppliers from '../FavouriteSuppliers/FavouriteSuppliers';
import 'react-toastify/dist/ReactToastify.css';
import UserMessages from '../UserSideMessages/UserMessages';
import { ToastContainer } from 'react-toastify';
import PrivacyPolicy from '../Policies/PrivacyPolicy';
import RefundPolicy from '../Policies/RefundPolicy';
import TermsConditions from '../Policies/TermsConditions';

// const ProductScreen = lazy(() => import('../../components/Product/Product'));

const Application = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Logo color="black" />
        <ToastContainer />
        <main className="main">
          <Switch>
            <Route exact path="/" component={LandingUser} />
            <Route exact path="/suppliers" component={LandingSupplier} />
            <Route exact path="/search-result" component={SearchResultBox} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/supplier/:id" component={OpenProfile} />
            <Route exact path="/supplier/:id/product/:id" component={Product} />
            <Route exact path="/sign-in" component={LoginUser} />
            <Route exact path="/sign-up" component={RegisterUser} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/terms-conditions" component={TermsConditions} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/refund-policy" component={RefundPolicy} />
            <PrivateRouteUser exact path="/placeorder" component={PlaceOrder} />
            <PrivateRouteUser exact path="/messages" component={UserMessages} />
            <PrivateRouteUser exact path="/order/:id" component={Order} />
            <PrivateRouteUser exact path="/cart/:id?" component={Cart} />
            <PrivateRouteUser
              exact
              path="/myorders/:id"
              component={UserOrders}
            />
            <PrivateRouteUser exact path="/payment" component={Payment} />
            <PrivateRouteUser exact path="/shipping" component={Shipping} />
            <PrivateRouteUser
              exact
              path="/my-suppliers"
              component={FavouriteSuppliers}
            />
            <Route
              exact
              path="/supplier-register"
              component={RegisterSupplier}
            />
            <PrivateRoute path="/dashboard" component={DashboardSupplier} />
          </Switch>
          <Footer />
        </main>
      </Fragment>
    </BrowserRouter>
  );
};

export default Application;

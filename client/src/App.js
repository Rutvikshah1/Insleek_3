import React, { useEffect } from 'react';
import Application from './containers/Application/Application';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/authUser';
import './App.scss';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadSupplier } from './actions/authSupplier';
import Logo from './components/Logo/Logo';
import Copyright from './components/Copyright/Copyright';

if (localStorage.tokenUser) {
  setAuthToken(localStorage.tokenUser);
}

if (localStorage.tokenSupplier) {
  setAuthToken(localStorage.tokenSupplier);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSupplier());
  }, []);

  return (
    <Provider store={store}>
      <Logo color="black" />
      <Application />
      <Copyright />
    </Provider>
  );
};

export default App;

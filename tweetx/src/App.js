import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Feed from './components/users/Feeds';
import Write from './components/users/Write';
import Users from './components/users/Users';
import Profile from './components/users/Profile';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from '../src/actions/auth';
import PrivateRoute from './components/routes/PrivateRoute';
import { LOGOUT } from './actions/types';
import NotFound from './components/layout/NotFound';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route
            exact
            path='/feed'
            element={<PrivateRoute component={Feed} />}
          />
          <Route
            exact
            path='/users'
            element={<PrivateRoute component={Users} />}
          />
          <Route
            exact
            path='/profile'
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            exact
            path='/write-post'
            element={<PrivateRoute component={Write} />}
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

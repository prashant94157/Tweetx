import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Feed from './components/users/Feed';
import Users from './components/users/Users';
import Profile from './components/users/Profile';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from '../src/actions/auth';
import PrivateRoute from './components/routes/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);
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
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

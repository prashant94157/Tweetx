import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/feed' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to='/register' className='mt-3 mb-5 btn btn-outline-primary'>
            Create Account
          </Link>
          <main className='form-signin'>
            <form onSubmit={(e) => onSubmit(e)}>
              <h1 className='h3 mb-4 fw-normal'>Login</h1>

              <div className='form-floating mb-3'>
                <input
                  type='email'
                  className='form-control'
                  id='floatingInput'
                  placeholder='name@example.com'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => onChangeHandler(e)}
                  required
                />
                <label htmlFor='floatingInput'>Email address</label>
              </div>

              <div className='form-floating'>
                <input
                  type='password'
                  className='form-control'
                  id='floatingPassword'
                  placeholder='Password'
                  name='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                  required
                />
                <label htmlFor='floatingPassword'>Password</label>
              </div>

              <div className='row mt-4'>
                <div className='col'>
                  <a className='text-decoration-none' href='www.google.com'>
                    Forgot Password ?
                  </a>
                </div>
                <div className='col d-flex flex-row-reverse text-center'>
                  <button className='w-50 btn btn-pink' type='submit'>
                    Login
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
        <div className='col d-none d-sm-block'>
          <lottie-player
            src='https://assets3.lottiefiles.com/packages/lf20_osdxlbqq.json'
            background='transparent'
            speed='1'
            // style='width: 600px; height: 600px'
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/feed' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to='/' className='mt-3 mb-5 btn w-25 btn-outline-primary'>
            Login
          </Link>
          <main className='form-signin'>
            <form onSubmit={(e) => onSubmit(e)}>
              <h1 className='h3 mt-3 mb-5 fw-normal'>Create Account</h1>

              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  // id='floatingInput'
                  placeholder='Name'
                  name='name'
                  value={name}
                  required
                  onChange={(e) => onChangeHandler(e)}
                />
                <label htmlFor='floatingInput'>Name</label>
              </div>

              <div className='form-floating mb-3'>
                <input
                  type='email'
                  className='form-control'
                  // id='floatingInput'
                  placeholder='name@example.com'
                  name='email'
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
                  // id='floatingPassword'
                  placeholder='Password'
                  autoComplete='new-password'
                  name='password'
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                  required
                />
                <label htmlFor='floatingPassword'>Password</label>
              </div>
              <div className='form-floating mb-3 mt-3'>
                <input
                  type='password'
                  className='form-control'
                  // id='floatingPassword'
                  placeholder='Password'
                  autoComplete='new-password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChangeHandler(e)}
                  required
                />
                <label htmlFor='floatingPassword'>Confirm Password</label>
              </div>
              <div className='hstack gap-3'>
                <button
                  className='w-25 ms-auto btn btn-lg btn-pink'
                  type='submit'
                >
                  Sign in
                </button>
              </div>
            </form>
          </main>
        </div>
        <div className='col'>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

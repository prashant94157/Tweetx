import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  const authlinks = (
    <Fragment>
      <a
        onClick={logout}
        href='#!'
        className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'
      >
        <span className='fs-4 pink fw-bold'>Tweetx</span>
      </a>
      <ul className='nav nav-pills'>
        <li className='nav-item'>
          <Link
            to='/feed'
            className={`nav-link ${pathname === '/feed' ? 'pink' : ''}`}
          >
            Feed
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/users'
            className={`nav-link ${pathname === '/users' ? 'pink' : ''}`}
          >
            Users
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/profile'
            className={`nav-link ${pathname === '/profile' ? 'pink' : ''}`}
          >
            Profile
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const guestlinks = (
    <Link
      to='/feed'
      className='d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none'
    >
      <span className='fs-4 pink fw-bold'>Tweetx</span>
    </Link>
  );
  return (
    <div className='container'>
      <header className='d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'>
        {!loading && (
          <Fragment>{isAuthenticated ? authlinks : guestlinks}</Fragment>
        )}
      </header>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

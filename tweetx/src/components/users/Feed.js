import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Feed = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      <button className='btn mt-5 write btn-lg btn-pink' type='submit'>
        Write
      </button>

      <div className='list-group list-group-flush scrollarea mt-5'>
        <div className='mt-4 mb-4 shadow-sm bg-body list-group-item d-flex gap-3 py-3 feed'>
          <img
            src='https://github.com/twbs.png'
            alt='twbs'
            width='45'
            height='45'
            className='rounded-circle mt1 flex-shrink-0'
          />
          <div className='ms-4 w-100 justify-content-between d-flex flex-wrap'>
            <h6 className='mb-0'>Arjun Reddy</h6>
            <p className='opacity-50'>10 mins ago</p>
            <p className='mb-0 opacity-75'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
              accusantium officia velit placeat, quidem alias illum commodi
              consequuntur dolorem tempora quam omnis libero quas voluptatibus
              quod amet aut culpa labore.
            </p>
          </div>
          <div class='semi'></div>
        </div>
      </div>
    </div>
  );
};

Feed.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Feed);

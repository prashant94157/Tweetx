import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/users';
import Spinner from '../layout/Spinner';
import { follow } from '../../actions/follow';
import { getCurrentProfile } from '../../actions/profile';

const Users = ({
  getUsers,
  auth: {
    isAuthenticated,
    loading: authLoading,
    user: { _id },
  },
  users: { loading: usersLoading, users },
  getCurrentProfile,
  follow,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  const onClickHandle = (id) => {
    follow(id);
    getCurrentProfile();
    getUsers();
    navigate('/users');
  };

  return authLoading || usersLoading ? (
    <Spinner />
  ) : (
    <div className='list-group list-group-flush scrollarea mt-5'>
      {users.map(({ user, following, follower }, index) => {
        

        return user._id !== _id ? (
          <div
            className='mt-4 mb-4 border-bottom list-group-item d-flex gap-3 py-3'
            key={index}
          >
            <img
              src={user.avatar}
              alt='twbs'
              width='32'
              height='32'
              className='rounded-circle flex-shrink-0'
            />
            <div className='ms-4 w-100 justify-content-between'>
              <h6 className='mb-0'>{user.name}</h6>
              <p className='mb-0 opacity-50'>Following : {following.length}</p>
            </div>
            <small className='text-nowrap'>
              {follower.find((obj) => obj.user === _id) ? (
                <button className='btn btn-sm btn-grey' type='submit'>
                  Following
                </button>
              ) : (
                <button
                  className='btn btn-sm btn-pink'
                  type='submit'
                  onClick={() => onClickHandle(user._id)}
                >
                  Follow
                </button>
              )}
            </small>
          </div>
        ) : (
          ''
        );
      })}
    </div>
  );
};

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, {
  getUsers,
  follow,
  getCurrentProfile,
})(Users);

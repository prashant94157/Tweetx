import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../actions/users';

const Users = ({
  getUsers,
  auth: {
    isAuthenticated,
    loading: authLoading,
    user: { _id },
  },
  users: { loading: usersLoading, users },
}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return authLoading || usersLoading ? (
    <div>loading</div>
  ) : (
    <div className='list-group list-group-flush scrollarea mt-5'>
      {users.map(({ user, following, follower }) => {
        let fl = follower.find((obj) => obj.user === _id);

        return (
          <div className='mt-4 mb-4 border-bottom list-group-item d-flex gap-3 py-3'>
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
              {fl ? (
                <button className='btn btn-sm btn-grey' type='submit'>
                  Following
                </button>
              ) : (
                <button className='btn btn-sm btn-pink' type='submit'>
                  Follow
                </button>
              )}
            </small>
          </div>
        );
      })}
    </div>
  );
};

Users.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);

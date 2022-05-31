import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import Following from './Following';
import Post from './Post';
import Follower from './Follower';
import Spinner from '../layout/Spinner';

const Profile = ({
  auth: { isAuthenticated, loading: authLoading, user },
  post: { loading: postLoading, posts },
  profile: { loading: profileLoading, profile },
  getCurrentProfile,
  getPosts,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getCurrentProfile, getPosts]);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  let f =
    posts.length > 0
      ? posts.reduce(
          (sum, post) => sum + (post.user._id === user._id ? 1 : 0),
          0
        )
      : 0;
  return authLoading || profileLoading || postLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='p-3'>
            <img
              src={user.avatar}
              alt='twbs'
              width='100'
              height='100'
              className='rounded-circle flex-shrink-0'
            />
          </div>
          <div className='p-3'>
            <h1>{user.name}</h1>
            <ul className='nav nav-pills opacity-75'>
              <li className='text-secondary me-3'>
                <p>Posts : {f}</p>
              </li>
              <li className='text-secondary'>
                <p>Followers : {profile.follower.length}</p>
              </li>
              <li className='text-secondary ms-3'>
                <p>Following : {profile.following.length}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <ul className='w-auto  nav nav-tabs m-auto' id='myTab'>
            <li className='nav-item'>
              <a href='#home' className='nav-link active' data-bs-toggle='tab'>
                <i className='fa-regular fa-address-card'></i> Post
              </a>
            </li>
            <li className='nav-item'>
              <a href='#profile' className='nav-link' data-bs-toggle='tab'>
                <i className='fa-regular fa-address-card'></i> Followers
              </a>
            </li>
            <li className='nav-item'>
              <a href='#messages' className='nav-link' data-bs-toggle='tab'>
                <i className='fa-regular fa-address-card'></i> Following
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='m-4'>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='home'>
            <div className='list-group list-group-flush scrollarea mt-5'>
              {f > 0 ? (
                posts.map((post, index) => {
                  f = 1;
                  return (
                    post.user._id === user._id && (
                      <Post post={post} key={index} />
                    )
                  );
                })
              ) : (
                <h4>No posts found...</h4>
              )}
            </div>
          </div>
          <div className='tab-pane fade' id='profile'>
            <div className='list-group list-group-flush scrollarea mt-5'>
              {profile.follower.length > 0 ? (
                profile.follower.map(({ user }, index) => (
                  <Follower user={user} key={index} />
                ))
              ) : (
                <h4>No followers found...</h4>
              )}
            </div>
          </div>
          <div className='tab-pane fade' id='messages'>
            <div className='list-group list-group-flush scrollarea mt-5'>
              {profile.following.length > 0 ? (
                profile.following.map(({ user }, index) => (
                  <Following user={user} key={index} />
                ))
              ) : (
                <h4>No followings found...</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(
  Profile
);

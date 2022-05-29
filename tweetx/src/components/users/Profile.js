import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { getCurrentProfile } from '../../actions/profile';
import { getPosts } from '../../actions/post';

const Profile = ({
  auth: {
    isAuthenticated,
    loading: authLoading,
    user: { name, avatar },
  },
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

  return authLoading || profileLoading || postLoading ? (
    <div>loading</div>
  ) : (
    <div>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='p-3'>
            <img
              src={avatar}
              alt='twbs'
              width='100'
              height='100'
              className='rounded-circle flex-shrink-0'
            />
          </div>
          <div className='p-3'>
            <h1>{name}</h1>
            <ul className='nav nav-pills opacity-75'>
              <li className='text-secondary me-3'>
                <p>Posts : {posts.length}</p>
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
                <i class='fa-regular fa-address-card'></i> Post
              </a>
            </li>
            <li className='nav-item'>
              <a href='#profile' className='nav-link' data-bs-toggle='tab'>
                <i class='fa-regular fa-address-card'></i> Followers
              </a>
            </li>
            <li className='nav-item'>
              <a href='#messages' className='nav-link' data-bs-toggle='tab'>
                <i class='fa-regular fa-address-card'></i> Following
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='m-4'>
        <div className='tab-content'>
          <div className='tab-pane fade show active' id='home'>
            {posts.map((post) => (
              <div className='list-group list-group-flush scrollarea mt-5'>
                <div className='mt-4 mb-4 shadow-sm bg-body list-group-item d-flex gap-3 py-3 feed'>
                  <img
                    src={post.avatar}
                    alt='twbs'
                    width='45'
                    height='45'
                    className='rounded-circle mt1 flex-shrink-0'
                  />
                  <div className='ms-4 w-100 justify-content-between d-flex flex-wrap'>
                    <h6 className='mb-0'>{name}</h6>
                    <p className='opacity-50'>
                      <Moment format='DD/MM/YY'>{post.date}</Moment>
                    </p>
                    <p className='mb-0 opacity-75'>{post.text}</p>
                  </div>
                  <div class='semi'></div>
                </div>
              </div>
            ))}
          </div>
          <div className='tab-pane fade' id='profile'>
            <div className='list-group list-group-flush scrollarea mt-5'>
              {profile.follower.map(({ user: { avatar, name }, index }) => (
                <div className='mt-4 mb-4 d-flex gap-3 py-3 feed' key={index}>
                  <img
                    src={avatar}
                    alt='twbs'
                    width='45'
                    height='45'
                    className='rounded-circle mt1 flex-shrink-0'
                  />
                  <div className='ms-4 w-100 justify-content-between'>
                    <h6 className='mb-0'>{name}</h6>

                    <p className='mb-0 opacity-75 followersub'>
                      Followers : 511
                    </p>
                  </div>
                  <small className='text-nowrap m-auto'>
                    <button type='button' className='btn btn-pink'>
                      Follow
                    </button>
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div className='tab-pane fade' id='messages'>
            <div className='list-group list-group-flush scrollarea mt-5'>
              {profile.following.map(({ user: { avatar, name }, index }) => (
                <div className='mt-4 mb-4 d-flex gap-3 py-3 feed'>
                  <img
                    src={avatar}
                    alt='twbs'
                    width='45'
                    height='45'
                    className='rounded-circle mt1 flex-shrink-0'
                  />
                  <div className='ms-4 w-100 justify-content-between'>
                    <h6 className='mb-0'>Arjun Reddy</h6>

                    <p className='mb-0 opacity-75 followersub'>
                      Following : 511
                    </p>
                  </div>
                  <small className='text-nowrap m-auto'>Following</small>
                </div>
              ))}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(
  Profile
);

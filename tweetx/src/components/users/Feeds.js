import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import Feed from './Feed';
import Spinner from '../layout/Spinner';

const Feeds = ({
  auth: { isAuthenticated, loading: authLoading },
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
    <Spinner />
  ) : (
    <div>
      <Link to='/write-post' className='btn mt-5 write btn-lg btn-pink'>
        Write
      </Link>

      <div className='list-group list-group-flush scrollarea mt-5'>
        {profile.following.length > 0 &&
          profile.following.map((ele) =>
            posts.map((post, index) =>
              post.user._id === ele.user._id ? (
                <Feed key={index} post={post} />
              ) : (
                ''
              )
            )
          )}
      </div>
    </div>
  );
};

Feeds.propTypes = {
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

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(Feeds);

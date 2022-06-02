import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { follow } from '../../actions/follow';

const Follower = ({ user: { avatar, name, id }, index, follow }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    follow(id);
    navigate('/users');
  };
  return (
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
        <p className='mb-0 opacity-75 followersub'>Followers : 511</p>
      </div>
      <small className='text-nowrap m-auto'>
        <button
          type='button'
          className='btn btn-pink'
          onClick={() => onClickHandler()}
        >
          Follow
        </button>
      </small>
    </div>
  );
};

export default connect(null, { follow })(Follower);

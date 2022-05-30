import React from 'react';

const Following = ({ user: { avatar, name }, index }) => {
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

        <p className='mb-0 opacity-75 followersub'>Following : 511</p>
      </div>
      <small className='text-nowrap m-auto'>Following</small>
    </div>
  );
};

export default Following;

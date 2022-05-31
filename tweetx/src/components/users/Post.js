import React from 'react';
import Moment from 'react-moment';

const Post = ({
  post: {
    user: { name, avatar },
    text,
    date,
  },
  index,
}) => {
  return (
    <div
      className='mt-4 mb-4 shadow-sm bg-body list-group-item d-flex gap-3 py-3 feed'
      key={index}
    >
      <img
        src={avatar}
        alt='twbs'
        width='45'
        height='45'
        className='rounded-circle mt1 flex-shrink-0'
      />
      <div className='ms-4 w-100 justify-content-between d-flex flex-wrap'>
        <h6 className='mb-0'>{name}</h6>
        <p className='opacity-50'>
          <Moment format='DD/MM/YY'>{date}</Moment>
        </p>
        <p className='mb-0 opacity-75'>{text}</p>
      </div>
      <div className='semi'></div>
    </div>
  );
};

export default Post;

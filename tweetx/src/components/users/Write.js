import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { write } from '../../actions/post';

const Write = ({ auth: { isAuthenticated }, write }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }
  const onChangeHandler = (e) => setContent(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    write(content);
    navigate('/feed');
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Write a post
              </label>
              <textarea
                className='form-control'
                id='exampleFormControlTextarea1'
                rows='10'
                name='content'
                value={content}
                onChange={(e) => onChangeHandler(e)}
              ></textarea>
              <button className='w-25 mt-3 btn btn-pink' type='submit'>
                Post
              </button>
            </div>
          </form>
        </div>

        <div className='col d-none d-sm-block'>
          <lottie-player
            src='https://assets3.lottiefiles.com/packages/lf20_osdxlbqq.json'
            background='transparent'
            speed='1'
            // style='width: 600px; height: 600px'
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
};

Write.propTypes = {
  auth: PropTypes.object.isRequired,
  write: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { write })(Write);

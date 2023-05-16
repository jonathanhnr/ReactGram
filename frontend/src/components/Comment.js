import React, { useState } from 'react';
import "./Comment.css"
import { comment } from '../slices/photoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../hooks/useResetComponentMessage';

const Comment = ({ photo }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const handleComment = e => {
    e.preventDefault();

    if(!commentText.trim()){
      return
    }
    const commentData = {
      comment: commentText,
      id: photo._id
    };

    dispatch(comment(commentData));

    setCommentText('');

    resetMessage();
  };


  return (
    <>
      <form className={"comment"} onSubmit={handleComment}>
          <input
            className={"input-comment"}
            type='text'
            placeholder={'Insira seu comentario'}
            onChange={e => setCommentText(e.target.value)}
            value={commentText || ''}
          />
          <input className={"input-submit"} type='submit' value={'Publicar'} />
      </form>
    </>
  );
};

export default Comment;
import React from 'react';
import { uploads } from '../utils/config';
import { Link } from 'react-router-dom';
import { BsXLg } from 'react-icons/bs';
import { deleteComment} from '../slices/photoSlice';
import { useDispatch } from 'react-redux';
import Avatar from './Avatar';

const CommentList = ({comments, photoId, userAuth}) => {

  const dispatch = useDispatch();
  const handleDelete = (id) => {
  dispatch(deleteComment({ id, photoId }))
  };
  return (
    <>
      {comments.length === 0 && <p>Nao ha comentarios</p>}
      {comments.map((comment) => (
        <div className="comment-item" key={comment.comment}>
          <div className="author">
            {comment.userImage && (
              <Avatar src={`${uploads}/users/${comment.userImage}`} size={"P"} border={"R"}/>
            )}
            <Link to={`/users/${comment.userId}`}>
              <p>{comment.userName}</p>
            </Link>
            <p>{comment.comment}</p>
          </div>
          {comment.userId === userAuth ? (
            <BsXLg className={"delete"} onClick={() => handleDelete(comment.id)} />
          ): ("")}
        </div>
      ))}
    </>
  );
};

export default CommentList;
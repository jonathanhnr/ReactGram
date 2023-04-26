import React from 'react';
import { uploads } from '../utils/config';
import { Link } from 'react-router-dom';

const CommentList = ({comments}) => {
  return (
    <>
      {comments.length === 0 && <p>Nao ha comentarios</p>}
      {comments.map((comment) => (
        <div className="comment" key={comment.comment}>
          <div className="author">
            {comment.userImage && (
              <img src={`${uploads}/users/${comment.userImage}`} alt={comment.userName}/>
            )}
            <Link to={`/users/${comment.userId}`}>
              <p>{comment.userName}</p>
            </Link>
          </div>
          <p>{comment.comment}</p>
        </div>
      ))}
    </>
  );
};

export default CommentList;
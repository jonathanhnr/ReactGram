import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { firstName } from '../helpers/strings';

const CommentItem = ({ photo, comments }) => {
  const comment = comments;
  const ultimo = useMemo(() => {
    if (comment?.length > 0) {
      return comment.at(-1);
    }
    return null;
  }, [comment]);

  return (<>
    {comments && comments.length > 0 && (
      <div key={ultimo.comments}>
        <div>
          {comment?.length > 0 && (<>
              {comment.length === 1 ? (<>
                  <div className={"content-comment"}>
                    <Link to={`/users/${ultimo?.userId}`}>
                      {firstName(ultimo?.userName)}
                    </Link>
                    <p>{ultimo?.comment}</p>
                  </div>
                </>
              ) : (
                <div>
                  <Link to={`/photos/${photo._id}`}>
                   <h2> {`ver todos os ${comment.length} comentarios`}</h2>
                  </Link>
                  <div className={"content-comment"}>
                    <Link to={`/users/${ultimo?.userId}`}>
                      {firstName(ultimo?.userName)}
                    </Link>
                    <p>{ultimo?.comment}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )}
  </>);
};

export default CommentItem;
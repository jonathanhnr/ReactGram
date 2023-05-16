import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { firstName } from '../helpers/strings';

const CommentItem = ({ photo, comments , onComment}) => {
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
                  <button className={"btnt"} onClick={onComment}>
                   <h2> {`ver todos os comentarios`}</h2>
                  </button>
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
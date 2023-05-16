import './LikeContainer.css';

import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMemo } from 'react';
import { firstName } from '../helpers/strings';
import { uploads } from '../utils/config';
import Avatar from './Avatar';


const LikeContainer = ({ photo, user, handleLike, onComment }) => {
  const likes = photo.likes;
  const ultimo = useMemo(() => {
    if (likes?.length > 0) {
      return likes.at(-1);
    }
    return null;
  }, [likes]);
  return (
    <div className='like'>
      <div className={'icons'}>
        {photo.likes && user && (
          <>
            {photo.likes.some(like => like._id === user._id) ? (
              <BsHeartFill className={"coracao"} onClick={() => handleLike(photo)} />
            ) : (
              <span><BsHeart onClick={() => handleLike(photo)}/></span>)}
          <a onClick={onComment}><BsChat/></a>
          </>
        )}
      </div>
      {likes?.length > 0 && (
        <div>
          {likes.length === 1 ? (
            <div className={'like-text'}>
              <Avatar size={"P"} src={`${uploads}/users/${ultimo?.profileImage}`} border={"R"}/>
              <p> {`curtido por ${firstName(ultimo?.name)}`}</p>
            </div>
          ) : (
            <div className={'like-text'}>
              <Avatar size={"P"} src={`${uploads}/users/${ultimo?.profileImage}`} border={"R"}/>
              <p>{`Curtido por ${firstName(ultimo?.name)} e mais ${likes.length - 1} pessoas`}</p>
            </div>
          )}
        </div>
      )}
    </div>);
};

export default LikeContainer;

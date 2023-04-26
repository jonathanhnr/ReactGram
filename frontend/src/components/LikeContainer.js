import './LikeContainer.css';

import { BsChat, BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMemo } from 'react';
import { firstName } from '../helpers/strings';
import { uploads } from '../utils/config';


const LikeContainer = ({ photo, user, handleLike }) => {
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
      {photo.likes && user && (<>
        {photo.likes.some(like => like._id === user._id) ? (
          <BsHeartFill onClick={() => handleLike(photo)} />) : (
          <span><BsHeart onClick={() => handleLike(photo)} /></span>)}
        <span><BsChat /></span>
      </>)}
    </div>
    {likes?.length > 0 && (
      <div >
        {likes.length === 1 ? (
          <div className={"like-text"}>
            <img className={'photo-user'} src={`${uploads}/users/${ultimo?.profileImage}`} alt='photo-user' />
            <p> {`curtido por ${firstName(ultimo?.name)}`}</p>
          </div>
        ) : (
          <div className={"like-text"}>
            <img className={'photo-user'} src={`${uploads}/users/${ultimo?.profileImage}`} alt='photo-user' />
            <p>{`Curtido por ${firstName(ultimo?.name)} e mais ${likes.length - 1} pessoa`}</p>
          </div>
        )}
      </div>
    )}
  </div>);
};

export default LikeContainer;

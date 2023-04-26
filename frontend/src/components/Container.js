import React, { useEffect } from 'react';
import { uploads } from '../utils/config';
import PhotoItem from './PhotoItem';
import { Link, Navigate } from 'react-router-dom';
import LikeContainer from './LikeContainer';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../hooks/useResetComponentMessage';
import { getPhotos, like } from '../slices/photoSlice';
import { firstName } from '../helpers/strings';
import Comment from './Comment';
import Photo from '../pages/Photo/Photo';
import CommentItem from './CommentItem';

const Container = () => {
  const { auth, loading: authLoading } = useAuth();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector(state => state.auth);
  const { photos, loading } = useSelector(state => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = photo => {
    dispatch(like(photo._id));

    resetMessage();
  };
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!authLoading && !auth) {
    return <Navigate to='/login' />;
  }
  return (
    <div className={''}>
      <div id={'home'}>
        {photos &&
          photos.map(photo => (
            <div className={'post'} key={photo._id}>
              <div>
                <div className={'container-img'}>
                  {photo.userId.profileImage && (
                    <img
                      src={`${uploads}/users/${photo.userId.profileImage}`}
                      alt={user.name}
                    />
                  )}
                  <h2>{firstName(photo.userName)}</h2>
                </div>
              </div>
              <PhotoItem photo={photo} />
              <div className={'container-text'}>
                <LikeContainer
                  photo={photo}
                  user={user}
                  handleLike={handleLike}
                />
                <div className={'container-user'}>
                  <p className='photo-author '>
                    <Link to={`/users/${photo.userId._id}`}>
                      {firstName(photo.userName)}
                    </Link>
                  </p>
                  <h3>{photo.title}</h3>
                </div>
              <CommentItem photo={photo} comments={photo.comments}/>
              </div>
              <Comment photo={photo} />
            </div>
          ))}
        {photos && photos.length === 0 && (
          <h2 className='no-photos'>
            Ainda nao a fotos publicadas,{' '}
            <Link to={`/users/${user._id}`}>clique aqui</Link>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Container;

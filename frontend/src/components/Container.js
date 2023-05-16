import React, { useEffect, useState } from 'react';
import { uploads } from '../utils/config';
import PhotoItem from './PhotoItem';
import { Link, Navigate } from 'react-router-dom';
import LikeContainer from './LikeContainer';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useResetComponentMessage } from '../hooks/useResetComponentMessage';
import {
  deletePhoto,
  getPhotos,
  like,
  selectPhoto,
  setPhoto,
  setActivePhoto as setActivePhotoAction
} from '../slices/photoSlice';
import { firstName } from '../helpers/strings';
import Comment from './Comment';
import Photo from '../pages/Photo/Photo';
import CommentItem from './CommentItem';
import Modal from './Modal';
import photo from '../pages/Photo/Photo';
import { useActivePhoto } from '../hooks/useActivePhoto';
import Footer from './Footer';
import Avatar from './Avatar';

const Container = () => {
  const { auth, loading: authLoading } = useAuth();
  const dispatch = useDispatch();

  const setActivePhoto = (id) => {
    dispatch(setActivePhotoAction(id));
  };

  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector(state => state.auth);
  const { photos, loading } = useSelector(state => state.photo);
  const activePhoto = useActivePhoto();

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
  if (!user) return null

  return (
    <>
      <div id={'home'}>
        {photos &&
          photos.map(photo => {
            if (!photo.userId)
              console.log(photo, photo.userId);
            return (
              <div className={'post'} key={photo._id}>
                <div>
                  <div className={'container-img'}>
                    {photo?.userId.profileImage && (
                       <Avatar src={`${uploads}/users/${photo.userId.profileImage}`} size={"P"} border={"R"}/>
                    )}
                    <Link to={`/users/${photo.userId._id}`}><h2>{firstName(photo.userName)}</h2></Link>
                  </div>
                </div>
                <PhotoItem photo={photo} />
                <div className={'container-text'}>
                  <LikeContainer
                    photo={photo}
                    user={user}
                    handleLike={handleLike}
                    onComment={() => setActivePhoto(photo._id)}
                  />
                  <div className={'container-user'}>
                    <p className='photo-author '>
                      <Link to={`/users/${photo.userId._id}`}>
                        {firstName(photo.userName)}
                      </Link>
                    </p>
                    <h3>{photo.title}</h3>
                  </div>
                  <CommentItem
                    photo={photo} comments={photo.comments}
                    onComment={() => setActivePhoto(photo._id)}
                  />
                </div>
                <Comment photo={photo} />
              </div>
            );
          })}
        {activePhoto && (
          <Modal photo={activePhoto} onClose={() => setActivePhoto(null)} />
        )}

        {photos && photos.length === 0 && (
          <h2 className='no-photos'>
            Ainda nao a fotos publicadas,{' '}
            <Link to={`/users/${user._id}`}>clique aqui</Link>
          </h2>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Container;

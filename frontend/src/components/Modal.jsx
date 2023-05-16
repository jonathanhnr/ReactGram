import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import "./Modal.css"
import PhotoItem from './PhotoItem';
import Comment from './Comment';
import CommentList from './CommentList';
import { useDispatch, useSelector } from 'react-redux';
import { uploads } from '../utils/config';
import { firstName } from '../helpers/strings';
import LikeContainer from './LikeContainer';
import { deletePhoto, getPhoto, getPhotos, like, selectPhoto } from '../slices/photoSlice';
import Avatar from './Avatar';


const Modal = ({photo, onClose}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const handleLike = () => {
    dispatch(like(photo._id));
  };




  return (
    <Dialog.Root open={true} onOpenChange={(newOpen) => {
      if (!newOpen) {
        onClose()
      }
    }}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">

            <div className={'container-comments'}>
              <div className={'teste'}>
                <div className={'image'}>
                  <PhotoItem photo={photo}/>
                </div>
              </div>
              <div className={'content-inst'}>
                <div>
                  {photo.comments && (
                    <>
                      <div className={'container-img'}>
                        {photo.userId.profileImage && (
                           <Avatar src={`${uploads}/users/${photo.userId.profileImage}`} size={"P"} border={"R"}/>
                        )}
                        <h2>{firstName(photo.userName)}</h2>
                      </div>
                      <div className={"comments-item"}>
                        <CommentList comments={photo.comments} userAuth={user._id} photoId={photo._id}/>
                      </div>
                      <div style={{ padding: "10px" , borderTop: "1px solid #3b3b3b", borderBottom: "1px solid #3b3b3b"}}>
                        <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                      </div>
                      <Comment photo={photo} />
                    </>
                  )}
                </div>
              </div>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
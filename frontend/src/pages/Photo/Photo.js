import './Photo.css';
import { uploads } from '../../utils/config';


//components
import Message from '../../components/Message';
import { Link } from 'react-router-dom';

//hooks
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';

//redux
import { getPhoto, like, comment } from '../../slices/photoSlice';
import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';
import { reset } from '../../slices/authSlice';
import Comment from '../../components/Comment';
import CommentList from '../../components/CommentList';
import NavBar from '../../components/NavBar';
import { firstName } from '../../helpers/strings';
import { useActivePhoto } from '../../hooks/useActivePhoto';
import Avatar from '../../components/Avatar';

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { loading, error, message } = useSelector((state) => state.photo);
  const photo = useActivePhoto(id)

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    const commentData = {
      comment: commentText,
      id: photo._id
    };

    dispatch(comment(commentData));

    setCommentText('');

    resetMessage();
  };

if (loading || !photo) {
    return <p>Carregando.....</p>;
  }

  return (
    <div className={'container'}>
      <NavBar />
      <div className={'container-comments'}>
        <div className={'teste'}>
          <div className={'image'}>
            <PhotoItem photo={photo} />
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
    </div>
  );
};

export default Photo;
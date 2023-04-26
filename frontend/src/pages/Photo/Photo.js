import "./Photo.css"
import {uploads} from "../../utils/config";


//components
import Message from "../../components/Message";
import {Link} from "react-router-dom"

//hooks
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage";

//redux
import {getPhoto, like, comment} from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import {reset} from "../../slices/authSlice";
import Comment from '../../components/Comment';
import CommentList from '../../components/CommentList';

const Photo = () => {
  const {id} = useParams()

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const {user} = useSelector((state) => state.auth)
  const {photo, loading, error, message} = useSelector((state) => state.photo)

  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    dispatch(getPhoto(id))
  }, [dispatch, id])

  const handleLike = () => {
    dispatch(like(photo._id))

    resetMessage()
  }

  const handleComment = (e) => {
    e.preventDefault()
    if(!commentText.trim()){
      return
    }

    const commentData = {
      comment: commentText,
      id: photo._id
    }

    dispatch(comment(commentData))

    setCommentText("")

    resetMessage()
  }

  if (loading) {
    return <p>Carregando.....</p>
  }


  return (
    <div id="photo">
      <PhotoItem photo={photo}/>
      <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
      <div className="message-container">
        {error && <Message msg={error} type="error"/>}
        {message && <Message msg={message} type="success"/>}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>comentarios: ({photo.comments.length})</h3>
           <Comment photo={photo}/>
           <CommentList comments={photo.comments}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
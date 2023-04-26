import './Profile.css';
import { uploads } from '../../utils/config';

import Message from '../../components/Message';
import { Link } from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserDetails } from '../../slices/userSlice';
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
} from '../../slices/photoSlice';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.user);
  const { user: userAuth } = useSelector(state => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector(state => {
    return state.photo;
  });

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const handleFile = e => {
    const image = e.target.files[0];

    setImage(image);
  };
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const submitHandle = e => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach(key => formData.append(key, photoData[key]));

    dispatch(publishPhoto(formData));

    setTitle('');

    resetComponentMessage();
  };

  const handleDelete = id => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle('hide');
    editPhotoForm.current.classList.toggle('hide');
  };

  const handleUpdate = e => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };
    dispatch(updatePhoto(photoData));

    resetComponentMessage();
  };
  const handleEdit = photo => {
    if (editPhotoForm.current.classList.contains('hide')) {
      hideOrShowForms();
    }
    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  const handleCancelEdit = () => {
    hideOrShowForms();
  };

  if (loading) {
    return <p>Carregando.....</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilher algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>titulo para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um titulo"
                  onChange={e => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value={'Postar'} />}
              {loadingPhoto && (
                <input type="submit" value="Aguarde ..." disabled />
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>editando</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder={'digite seu novo titulo'}
                onChange={e => setEditTitle(e.target.value)}
                value={editTitle || ''}
              />
              <input type="submit" value="atualizar" />
              <button className={'cancel-btn'} onClick={handleCancelEdit}>
                cancelar edicao
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>fotos publicadas</h2>
        <div className="photos-container">
          {photos &&
            photos.map(photo => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    ver
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>Ainda não a fotos publicadas</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import './Profile.css';
import { uploads } from '../../utils/config';

import Message from '../../components/Message';
import { Link } from 'react-router-dom';

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserDetails } from '../../slices/userSlice';
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto,
  updatePhoto, setActivePhoto as setActivePhotoAction
} from '../../slices/photoSlice';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';
import NavBar from '../../components/NavBar';
import Avatar from '../../components/Avatar';
import Footer from '../../components/Footer';
import ShareModal from '../../components/ShareModal';
import { useActivePhoto } from '../../hooks/useActivePhoto';
import Modal from '../../components/Modal';

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
  const setActivePhoto = (id) => {
    dispatch(setActivePhotoAction(id));
  };
  const activePhoto = useActivePhoto();


  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [activeModal, setActiveModal] = useState(false)
  const [endImage, setEndImage] = useState("../../public/favicon.ico")

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

    dispatch(publishPhoto([formData, () => {
      console.log('published')
    }]));

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
    <div className={'container'}>
      <NavBar />
      <div id="profile">
        <div className="profile-header">
          <div className={'ctn-img'}>
            <Avatar size={'G'} src={`${uploads}/users/${user.profileImage}`} border={"R"}/>
          </div>
          <div className="profile-description">
            <div
              style={{gap: '30px', display: 'flex', alignItems:'center'}}>
              <h2>{user.name}</h2>
              <a href={"/profile"} className={"btn-edit"}>Editar perfil</a>
            </div>
            <p>{user.bio}</p>

          </div>
        </div>
        <div style={{border:"1px solid #80808033", marginTop:"60px"}}></div>
        <h2 style={{color:"white"}}>Publicações</h2>
        {id === userAuth._id && (
          <>
            <div ref={newPhotoForm}></div>
            <div className="edit-photo hide" ref={editPhotoForm}>
             <div style={{display:"flex", justifyContent:"center"}}>
               <p>editando</p>
             </div>
             <div className={"edit-container"}>
               {editImage && (
               <div style={{padding:"5px"}}>
                 <Avatar size={"XS"} src={`${uploads}/photos/${editImage}`}/>
               </div>

               )}
             <div>
               <div style={{display:"flex", padding:"5px", alignItems:"center", gap:"10px"}}>
                 <Avatar size={"P"} border={"R"} src={`${uploads}/users/${user.profileImage}`}/>
                 <h2>{user.name}</h2>
               </div>
               <form className={"edit-text"} onSubmit={handleUpdate}>
                 <div>
                   <textarea
                     className={"edit-text-area"}
                     placeholder={'digite seu novo titulo'}
                     onChange={e => setEditTitle(e.target.value)}
                     value={editTitle || ''}
                   />
                 </div>
                 <div style={{display:"flex", justifyContent:"space-around", marginBottom:"25px"}}>
                   <input style={{backgroundColor:"#0095f6", borderRadius:"10px", padding:"4px 40px"}} type="submit" value="atualizar" />
                   <button className={'cancel-btn'} onClick={handleCancelEdit}>
                     cancelar edicao
                   </button>
                 </div>
               </form>
             </div>
             </div>
            </div>

          </>
        )}
        <div className="user-photos">

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
                    <div className="actions" >
                      <BsFillEyeFill onClick={() => setActivePhoto(photo._id)}/>
                      <BsPencilFill onClick={() => handleEdit(photo)} />
                      <BsXLg onClick={() => handleDelete(photo._id)} />
                    </div>
                  ) : (
                    <a className="btn" onClick={() => setActivePhoto(photo._id)}>
                      ver
                    </a>
                  )}
                </div>
              ))}
            {activePhoto && (
              <Modal photo={activePhoto} onClose={() => setActivePhoto(null)} />
            )}
            {photos.length === 0 && <p>Ainda não a fotos publicadas</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

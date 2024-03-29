import './EditProfile.css';
import { uploads } from '../../utils/config';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { profile, resetMessage, updateProfile } from '../../slices/userSlice';

import Message from '../../components/Message';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Avatar from '../../components/Avatar';

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector(state => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //fill form with use data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);
  const handleSubmit = async e => {
    e.preventDefault();

    const userData = {
      name,
    };
    if (profileImage) {
      userData.profileImage = profileImage;
    }
    if (bio) {
      userData.bio = bio;
    }
    if (password) {
      userData.password = password;
    }

    //build form data
    const formData = new FormData();

    Object.keys(userData).forEach(key => formData.append(key, userData[key]));

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = e => {
    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
  };


  return (
    <>
      <div className={'container'}>
        <NavBar />
        <div id={'edit-profile'}>
          <h2>Edite seus dados</h2>
          <p className={'subtitle'}>
            {' '}
            Adicionar uma imagem e conte mais sobre você
          </p>
          {(user.profileImage || previewImage) && (
            <>
              <Avatar
                size={'G'}
                border={"R"}
                src={
                  previewImage
                    ? URL.createObjectURL(previewImage)
                    : `${uploads}/users/${user.profileImage}`
                }
              />
            </>
          )}
          <form style={{ flexDirection: 'column' }} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              onChange={e => setName(e.target.value)}
              value={name || ''}
            />
            <input
              type="email"
              placeholder="email"
              disabled
              value={email || ''}
            />
            <label>
              <span>Imagem do perfil</span>
              <input type="file" onChange={handleFile} />
            </label>
            <label>
              <span>bio</span>
              <input
                type="text"
                placeholder="Descrição do perfil"
                onChange={e => setBio(e.target.value)}
                value={bio || ''}
              />
            </label>
            <label>
              <span>alter senha</span>
              <input
                type="password"
                placeholder={'Digite sua nova senha.'}
                onChange={e => setPassword(e.target.value)}
                value={password || ''}
              />
            </label>
            {!loading && <input type="submit" value={'Atualizar'} />}
            {loading && <input type="submit" value={'Aguarde...'} disabled />}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type={'success'} />}
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default EditProfile;

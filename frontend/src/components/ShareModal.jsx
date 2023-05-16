import * as Dialog from '@radix-ui/react-dialog';
import './ShareModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { publishPhoto, resetMessage } from '../slices/photoSlice';
import Avatar from './Avatar';
import { BsFileEarmarkPlus, BsFillFileImageFill } from 'react-icons/bs';
import { uploads } from '../utils/config';

const ShareModal = ({ onClose, loadingPhoto, uploads, user }) => {
  const { user: userAuth, loading } = useSelector(state => state.user);
  const newPhotoForm = useRef();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [active, setActive] = useState(false);
  const [content, setContent] = useState('');
  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = e => {
    const image = e.target.files[0];
    setImage(image);
    setPreviewImage(URL.createObjectURL(image));
  };

  const submitPhoto = e => {
    e.preventDefault();
    setActive(true);
    setContent('remove-none');
  };
  const submitHandle = e => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    const formData = new FormData();

    Object.keys(photoData).forEach(key => formData.append(key, photoData[key]));

    dispatch(
      publishPhoto([
        formData,
        () => {
          onClose();
        },
      ])
    );

    setTitle('');
    resetComponentMessage();
  };
  return (
    <Dialog.Root
      open={true}
      onOpenChange={newOpen => {
        if (!newOpen) {
          onClose();
        }
      }}
    >
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlayShare" />
        <Dialog.Content className="DialogContentShare">
          <div className="submit-photo" ref={newPhotoForm}>
            <form style={{ flexDirection: 'column' }} onSubmit={submitHandle}>
              {image ? (
                <div>
                  <div
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        padding: '10px',
                        justifyContent: 'center',
                        display: 'flex',
                      }}
                    >
                      <button className={'btn-slc-photo'} onClick={submitPhoto}>
                        Avançar
                      </button>
                    </div>
                  </div>
                  <div className={'aline-modal'}>
                    <Avatar src={previewImage} size={'xs'} />
                    <div className={`content-modal ${content}`}>
                      {active && (
                        <div className={'description'}>
                          <div
                            style={{
                              display: 'flex',
                              gap: '10px',
                              marginBottom: '20px',
                            }}
                          >
                            <Avatar
                              size={'M'}
                              src={`${uploads}/users/${user?.profileImage}`}
                              border={'R'}
                            />
                            <h2>{userAuth.name}</h2>
                          </div>
                          <div>
                            <label>
                              <span>Escreva uma legenda</span>
                              <textarea
                                className={'text-area'}
                                placeholder="Insira um titulo"
                                onChange={e => setTitle(e.target.value)}
                                value={title || ''}
                              />
                            </label>
                          </div>
                          {!loadingPhoto && (
                            <div className={'postar-photo'}>
                              {title.length <= 3 ? (
                                <input
                                  disabled
                                  className={'postar'}
                                  type="submit"
                                  value={'Postar'}
                                />
                              ) : (
                                <input
                                  className={'postar'}
                                  type="submit"
                                  value={'Postar'}
                                />
                              )}
                            </div>
                          )}
                          {loadingPhoto && (
                            <input type="submit" value="Aguarde ..." disabled />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className={'header'}>Criar nova publicação</div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '60px',
                    }}
                  >
                    <BsFileEarmarkPlus
                      style={{ width: '50px', height: '50px', color: 'white' }}
                    />
                  </div>
                  <label className={'btn-submit'}>
                    Selecionar foto
                    <input
                      type="file"
                      onChange={handleFile}
                      placeholder={'Selecionar'}
                    />
                  </label>
                </>
              )}
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareModal;

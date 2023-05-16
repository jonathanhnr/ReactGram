import './Footer.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsFillCameraFill, BsHouseDoorFill } from 'react-icons/bs';
import { uploads } from '../utils/config';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../slices/authSlice';
import ShareModal from './ShareModal';
import { useState } from 'react';

const Footer = () => {
  const { auth } = useAuth();
  const { user } = useSelector(state => state.auth);
  const [activeModal, setActiveModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };
  return (
    <div>
      <ul className={'footer-links'}>
        {auth ? (
          <>
            <li>
              <NavLink to='/'>
                <div className={"content-links"}>
                  <BsHouseDoorFill />
                </div>
              </NavLink>
            </li>
            {user && (
              <li>
               <div className={"content-links"}>
                 <a onClick={() => setActiveModal(true)}>
                   <BsFillCameraFill />
                 </a>
                 {activeModal &&(
                   <ShareModal onClose={() => setActiveModal(null)}/>
                 )}
               </div>
              </li>
            )}
            <li>
              <NavLink to={`/users/${user._id}`}>
                <div className={"content-links"}>
                  <img className={"footer-photo"} src={`${uploads}/users/${user.profileImage}`} alt='' />
                </div>
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to='/login'>Entrar</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Registrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Footer;

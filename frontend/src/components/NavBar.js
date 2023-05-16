import './NavBar.css';

//COMPONENTS
import { NavLink, Link } from 'react-router-dom';
import {
  BsSearch,
  BsFillPersonFill,
  BsFillCameraFill,
  BsHouseDoorFill
} from 'react-icons/bs';

//HOOKS
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Redux
import { logout, reset } from '../slices/authSlice';
import { uploads } from '../utils/config';
import Avatar from './Avatar';
import ShareModal from './ShareModal';

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector(state => state.auth);

  const [query, setQuery] = useState('');
  const [activeModal, setActiveModal] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  const handleSearch = e => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav">
      <Link style={{marginRight:"10px"}} to="/">ReactGram</Link>
      <form className={'search-form'} onSubmit={handleSearch}>
        <BsSearch className={'search-svg'} />
        <input
          className={'search-input'}
          type="text"
          placeholder={'Pesquisar'}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <ul className={'nav-links'}>
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <div className={'content-links'}>
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
                    <ShareModal onClose={() => setActiveModal(null)} uploads={uploads} user={user}/>
                  )}
                </div>
              </li>
            )}
            <li>
              <NavLink to={`/users/${user._id}`}>
                <div className={'content-links'}>
                  <Avatar
                    size={'P'}
                    src={`${uploads}/users/${user.profileImage}`}
                    border={"R"}
                  />
                </div>
              </NavLink>
            </li>
            <li>
              <span style={{marginRight:"10px"}} onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Registrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

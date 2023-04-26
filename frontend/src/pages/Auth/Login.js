import './Auth.css';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

//COMPONENTS
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

//HOOKS
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//REDUX
import { login, reset } from '../../slices/authSlice';

const Login = () => {
  const { auth, loading: loadingAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  //CLEAR ALL AUTH STATES
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (!loadingAuth && auth) {
    return <Navigate to="/" />;
  }

  return (
    <div id={'login'}>
      <h2>ReactGram</h2>
      <p className="subtitle"> Faça o login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email || ''}
        />
        <input
          type="password"
          placeholder={'Password'}
          onChange={e => setPassword(e.target.value)}
          value={password || ''}
        />
        {!loading && <input type="submit" value={'Entrar'} />}
        {loading && <input type="submit" value={'Aguarde...'} disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;

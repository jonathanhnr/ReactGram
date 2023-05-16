import './Auth.css';
import { Navigate } from 'react-router-dom';

//COMPONENTS
import { Link } from 'react-router-dom';
import Message from '../../components/Message';

//HOOKS
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//REDUX
import { register, reset } from '../../slices/authSlice';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const { auth } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(user);

    dispatch(register(user));
  };

  //CLEAR ALL AUTH STATES
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  if (!loading && auth) {
    return <Navigate to="/" />;
  }

  return (
   <div className={"box"}>
     <div className={"register"}>
       <h2>ReactGram</h2>
       <p className="subtitle">Cadastre-se para ver fotos e <br/>vídeos dos seus amigos</p>
       <form className={"form"} onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder={'Nome'}
           onChange={e => setName(e.target.value)}
           value={name || ''}
         />
         <input
           type="email"
           placeholder={'E-mail'}
           onChange={e => setEmail(e.target.value)}
           value={email || ''}
         />
         <input
           type="password"
           placeholder={'Senha'}
           onChange={e => setPassword(e.target.value)}
           value={password || ''}
         />
         <input
           type="password"
           placeholder={'Confirme a senha'}
           onChange={e => setConfirmPassword(e.target.value)}
           value={confirmPassword || ''}
         />
         {!loading && <input className={"button"} type="submit" value={'Cadastre-se'} />}
         {loading && <input type="submit" value={'Aguarde...'} disabled />}
         {error && <Message msg={error} type="error" />}
       </form>
     </div>
     <div className={"createRegister"}>
       <p>
         Tem uma conta?
         <Link to="/login"> Conecte-se</Link>
       </p>
     </div>
   </div>
  );
};

export default Register;

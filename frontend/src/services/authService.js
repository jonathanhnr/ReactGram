import { api, requestConfig } from '../utils/config';

//REGISTER AN USER
const register = async data => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(api + '/users/register', config)
      .then(re => re.json())
      .catch(err => err);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    return {
      errors: ['Requisicao falhou'],
    };
  }
};

//logout an user
const logout = () => {
  localStorage.removeItem('user');
};

//sign in an user
const login = async data => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(api + '/users/login', config)
      .then(re => re.json())
      .catch(err => err);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  } catch (error) {}
};

const authService = {
  register,
  logout,
  login,
};

export default authService;

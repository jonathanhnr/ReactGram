import { api, requestConfig } from '../utils/config';

const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);
  try {
    const res = await fetch(api + '/photos/', config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);
  try {
    const res = await fetch(api + '/photos/user/' + id, config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePhoto = async (id, token) => {
  const config = requestConfig('DELETE', null, token);
  try {
    const res = await fetch(api + '/photos/' + id, config)
      .then(re => re.json())
      .catch(err => err);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
const deleteComment = async (id ,photoId, token) => {
  const config = requestConfig('DELETE', null, token);
  try {
    const res = await fetch(`${api}/photos/comment/${photoId}/${id}` , config)
      .then(res => res.json())
      .catch(err => err);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);
  try {
    const res = await fetch(api + '/photos/' + id, config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPhoto = async (id, token) => {
  const config = requestConfig('GET', null, token);
  try {
    const res = await fetch(api + '/photos/' + id, config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const like = async (id, token) => {
  const config = requestConfig('PUT', null, token);
  try {
    const res = await fetch(api + '/photos/like/' + id, config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const comment = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(api + '/photos/comment/' + id, config)
      .then(re => re.json())
      .catch(err => err);
    console.log(res);
    return res;

  } catch (error) {
    console.log(error);
  }
};

const getPhotos = async token => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(api + '/photos/', config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const searchPhotos = async (query, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(api + '/photos/search?q=' + query, config)
      .then(re => re.json())
      .catch(err => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  deleteComment, publishPhoto, getUserPhotos, deletePhoto, updatePhoto, getPhoto, like, comment, getPhotos, searchPhotos
};

export default photoService;

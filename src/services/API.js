import axios from "axios";

const authInstance = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const getAllShops = async () => {
  const { data } = await authInstance.get('/shops');

  return data;
};

export const getProducts = async _id => {
  const { data } = await authInstance.post('/products', _id);
  return data;
}

export const addOrder = async data => {
  const { data: result } = await authInstance.post('/orders', data);
  return result;
}

const setToken = token => {
  if (token) {
    return (authInstance.defaults.headers.authorization = `Bearer ${token}`);
  }
  authInstance.defaults.headers.authorization = '';
};

export const register = async data => {
  const { data: result } = await authInstance.post('/auth/register', data);
  setToken(result.token);
  return result;
};

export const login = async data => {
  const { data: result } = await authInstance.post('/auth/login', data);
  setToken(result.token);
  return result;
};

export const getCurrent = async token => {
  try {
    setToken(token);
    const { data } = await authInstance.get('/auth/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

// export const patchCurrent = async (token, data) => {
//   try {
//     setToken(token);
//     console.log("data_auth", data)
//     const { data: result } = await authInstance.patch('/auth', data);
//     return result;
//   } catch (error) {
//     setToken();
//     throw error;
//   }
// };

export const patchCurrent = async data => {
  try {
    // console.log('data_auth', data);
    const { data: result } = await authInstance.patch('/auth', data);
    return result;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const { data } = await authInstance.post('/auth/logout');
  setToken();
  return data;
};

export const addUserPets = async data => {
  const response = await authInstance.patch('/auth', { myPets: data });
  const { myPets } = response.data;
  return myPets;
};

export const toggleFavoriteNotice = async id => {
  const { data } = await authInstance.patch('/auth', { favoriteNotice: id });
  return data;
};
import axios from "axios";

const authInstance = axios.create({
    baseURL: "http://localhost:5000/api",
})

export const getAllShops = async () => {
  const { data } = await authInstance.get('/shops');

  return data;
};

export const getDiskonts = async () => {
  const { data } = await authInstance.get('/diskonts');
  return data
}

export const getProducts = async _id => {
  const { data } = await authInstance.post('/products', _id);
  return data;
}

export const addOrder = async data => {
  const { data: result } = await authInstance.post('/orders', data);
  return result;
}


export const getAllOrders = async emaPhon => {
  const data = await authInstance.get('/orders', { params: emaPhon});

  return data;
}

export const findUserAPI = async email => {
  console.log(email)
  const data = await authInstance.get('/auth/user', { params: { email } });
  console.log("findUserAPI result:",data)
  return data
}




const setToken = token => {
  if (token) {
    return (authInstance.defaults.headers.authorization = `Bearer ${token}`);
  }
  authInstance.defaults.headers.authorization = '';
};

export const register = async data => {
  const { data: result } = await authInstance.post('/auth/register', data);
  if (!data.password) {
    setToken(result.token);
  }
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

export const logout = async () => {
  const { data } = await authInstance.post('/auth/logout');
  setToken();
  return data;
};
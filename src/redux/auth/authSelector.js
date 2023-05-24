export const isUserLogin = ({ auth }) => auth.isLogin;

export const getAuth = ({ auth }) => {
  const { isLogin, token } = auth;
  return { isLogin, token };
};

export const getUser = ({ auth }) => auth.user;

export const selectIsRegistered =  ({ auth }) => auth.isRegistered;

export const getUserDiskonts = ({ auth }) => auth.user.myDiskonts;

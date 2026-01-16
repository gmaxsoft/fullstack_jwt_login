const getLocalRefreshToken = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return undefined;
  const user = JSON.parse(userStr);
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return undefined;
  const user = JSON.parse(userStr);
  return user?.accessToken;
};

const updateNewAccessToken = (token) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return;
  let user = JSON.parse(userStr);
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  return JSON.parse(userStr);
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateNewAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;

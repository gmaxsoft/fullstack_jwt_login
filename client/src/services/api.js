import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          console.log("response", rs);

          const { accessToken } = rs.data;

          console.log("updateNewAccessToken", accessToken);
          TokenService.updateNewAccessToken(accessToken);

          return instance(originalConfig);

        // Retry the original request with the new token
        //originalRequest.headers.Authorization = `Bearer ${token}`;
        //return axios(originalRequest);

        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;

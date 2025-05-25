import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { storeFunctions } from "@/store/authSlice";
import { config } from "@/config";

export const getAxiosInstance = (url?: string) => {
  const axiosInstance = axios.create();
  const { token, setReset, loginToken, user } = storeFunctions.getState();

  axiosInstance.defaults.baseURL = url ?? config.baseUrl;

  if (token && user !== null) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (loginToken && user === null) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginToken}`;
  }

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const isUnauthorized = error.response && error.response.status === 401;
      if (isUnauthorized) {
        // Redirect out to Login screen
        setReset();
      }

      return Promise.reject(error);
    }
  );

  axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  axiosInstance.defaults.headers.common["Accept"] = "application/json";

  axiosInstance.defaults.withCredentials = false;

  return axiosInstance;
};


export const getRequest = async (url: string, config?: AxiosRequestConfig) => {
  const res = await getAxiosInstance().get(`${url}`, config);
  return res;
};

export const postRequest = async <T = unknown>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig
) => {
  const res = await getAxiosInstance().post(`${url}`, payload, config);
  return res;
};

export const patchRequest = async <T = unknown>(url: string, payload: T) => {
  const res = await getAxiosInstance().patch(`${url}`, payload);
  return res;
};

export const putRequest = async <T = unknown>(url: string, payload: T) => {
  const res = await getAxiosInstance().put(`${url}`, payload);
  return res;
};

export const deleteRequest = async <T = unknown>(url: string, payload?: T) => {
  const res = await getAxiosInstance().delete(`${url}`, { data: payload });
  return res;
};

export const externalUploadRequest = async (url: string, payload: FormData, baseUrl?: string) => {
  const res = await getAxiosInstance(baseUrl).post(`${url}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
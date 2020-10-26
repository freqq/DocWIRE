import axios from 'axios';
import get from 'lodash/get';
import { store } from 'store';

import httpStatuses from 'common/httpStatuses';
import { logoutUser } from 'common/actions/authUserActions';

const JSON_CONTENT_TYPE = 'application/json';

class RequestService {
  constructor() {
    this.axiosInstance = axios.create({
      headers: { 'Content-Type': JSON_CONTENT_TYPE },
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === httpStatuses.UNAUTHORIZED) {
          store.dispatch(logoutUser());
          return new Promise(() => false);
        }

        return Promise.reject(error);
      },
    );
  }

  static getToken() {
    return store !== undefined
      ? get(store.getState(), 'common.authUser.keycloakInfo.token', [])
      : null;
  }

  get(url, params = null) {
    return this.axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${RequestService.getToken()}` },
      params,
    });
  }

  postFile(url, data) {
    return this.axiosInstance.post(url, data, {
      headers: {
        Authorization: `Bearer ${RequestService.getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  post(url, data) {
    return this.axiosInstance.post(url, data, {
      headers: { Authorization: `Bearer ${RequestService.getToken()}` },
    });
  }

  put(url, data) {
    return this.axiosInstance.put(url, data, {
      headers: { Authorization: `Bearer ${RequestService.getToken()}` },
    });
  }

  delete(url) {
    return this.axiosInstance.delete(url, {
      headers: { Authorization: `Bearer ${RequestService.getToken()}` },
    });
  }
}

export default new RequestService();

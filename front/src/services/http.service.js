import Axios from 'axios';
import { clearError } from '../store/errorSlice';
import { handleError } from './error.service';
import store from '../store/store';

export const RESPONSE_TYPE_BLOB = 'blob';

const CONTENT_TYPE = 'Content-Type';
const APPLICATION_JSON = 'application/json';
const RESPONSE_TYPE_TEXT = 'text';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var axios = Axios.create({
  withCredentials: true,
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data, URL, responseType = RESPONSE_TYPE_TEXT) {
    return ajax(endpoint, 'POST', data, URL, responseType);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(
  endpoint,
  method = 'GET',
  data = null,
  URL,
  responseType = RESPONSE_TYPE_TEXT
) {
  try {
    store.dispatch(clearError());
    data = JSON.stringify(data);
    const config = {
      headers: {
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      url: `http://localhost:3030${endpoint}`,
      credentials: 'include',
      method,
      data,
      body: data,
      responseType,
    };
    const res = await axios(config);
    if (res.status !== 200) {
      return JSON.parse(res.data);
    } else return res.data;
  } catch (err) {
    handleError(err);
    throw err;
  }
}

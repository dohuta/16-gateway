import axios from 'axios';
import { BaseResponse } from 'libs/dtos/src';

export class AxiosBase {
  url: string;
  headers: any;

  constructor(url, headers) {
    if (url.endsWith('/')) url = url.slice(0, -1);
    this.url = url;
    var _headers = {
      accept: 'application/json',
      'content-type': 'application/json',
    };
    this.headers = { ..._headers, ...headers };
  }

  async get<T>(url, params): Promise<BaseResponse<T>> {
    let query = '';
    for (const p in params) {
      if (Object.prototype.hasOwnProperty.call(params, p)) {
        query += `${p}=${params[p]}&`;
      }
    }
    if (url.startsWith('/')) url = url.substr(1);
    var options = {
      method: 'GET',
      url: url + '/' + query,
      headers: this.headers,
    };
    return axios(options).then((response) => response.data);
  }

  async post<T>(url, data): Promise<BaseResponse<T>> {
    if (url.startsWith('/')) url = url.substr(1);
    var options = {
      method: 'POST',
      url: `${this.url}/${url}`,
      headers: this.headers,

      data: data,
    };
    return axios(options).then((response) => response.data);
  }
  async put() {}
  async patch() {}
  async delete() {}
}

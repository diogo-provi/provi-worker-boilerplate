import HttpClient from "./HttpClient";
import axios from "axios";

export default class HttpClientAxios implements HttpClient {
  async request(method: string, url: string, data?: any): Promise<any> {
    return axios({
      method,
      url,
      data,
    });
  }
}

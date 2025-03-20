import { Axios } from "axios";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export class BaseService {
  axiosClient: Axios;
  constructor() {
    this.axiosClient = new Axios({
      baseURL: BASE_URL,
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

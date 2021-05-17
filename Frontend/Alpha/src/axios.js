import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8069/", //change when backend gets deployed in heroku
});

export default instance;

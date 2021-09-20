import axios from "axios";

const instance = axios.create({
  baseURL: "https://art-aficionado-backend.herokuapp.com/", //change when backend gets deployed in heroku
});

export default instance;

import React from "react";
import axios from "axios";
export const Axios = axios.create({
      // baseURL:'http://10.1.4.1:4000/user/',
      // baseURL:'http://192.168.42.247:4000/user/',
      // baseURL: "http://localhost:4000/user/",
      baseURL: "http://" + process.env.REACT_APP_BASE_URL + ":4000/user/",
});

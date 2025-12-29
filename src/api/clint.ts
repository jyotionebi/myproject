import axios from "axios";

const Api = axios.create({
  baseURL: "https://69522ffe3b3c518fca11bf38.mockapi.io/api",
  headers: {
    "Content-Type": "application/json",
  },
  
});

export default Api;

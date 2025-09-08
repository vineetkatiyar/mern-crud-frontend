// axios.js (or your axios configuration file)
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/book', // Your backend server URL
  timeout: 10000,
});

export default instance;
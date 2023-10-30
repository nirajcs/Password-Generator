import axios from 'axios';
import Cookies from 'js-cookie';

// Create Axios instances
export const usersApi = axios.create({
  baseURL: 'http://localhost:5000/api/users',
});

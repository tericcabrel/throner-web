import axios from "axios";

const instance = axios.create({
  baseURL : process.env.REACT_APP_API_BASE_URL
});

// instance.defaults.headers.common['Token'] = 'AUTH TOKEN';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;

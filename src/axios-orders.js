import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-c196b.firebaseio.com/'
});

export default instance;
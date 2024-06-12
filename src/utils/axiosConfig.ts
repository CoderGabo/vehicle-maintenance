import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});

export default instance;

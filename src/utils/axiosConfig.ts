import axios from 'axios';

export const instanceBussiness = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});

export const instanceIA = axios.create({
  baseURL: 'http://34.72.103.174/api/',
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});


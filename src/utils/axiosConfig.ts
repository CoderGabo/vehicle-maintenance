import axios from 'axios';

export const instanceBussiness = axios.create({
  baseURL: 'http://bussinessint.azurewebsites.net/',
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});

export const instanceIA = axios.create({
  baseURL: 'http://35.188.39.83/api/',
  timeout: 5000, // Puedes ajustar el tiempo de espera según tus necesidades
});


import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://missing-pet.azurewebsites.net'
});
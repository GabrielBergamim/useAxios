import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const axiosPokemon = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

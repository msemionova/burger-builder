import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-6e165-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance;

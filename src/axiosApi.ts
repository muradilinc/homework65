import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://muradilinc20-default-rtdb.europe-west1.firebasedatabase.app'
});

export default axiosApi;
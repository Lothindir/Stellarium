const axiosHttp = require('axios');

export const axios = axiosHttp;

const baseUrl = 'http://localhost/';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? `${baseUrl}api/` : 'https://api.stellarium.com/';

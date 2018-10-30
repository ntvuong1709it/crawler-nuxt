const axios = require('axios')
const axiosInstace = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export function postItem(url, data) {
  return axios.post(url, { data });
}

export function runScheduler(url, urls) {
  console.log(urls);
  return axios.post(url, { urls });
}
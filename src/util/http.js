import axios from 'axios'
import {store} from '../redux/store.js'

axios.defaults.baseURL="http://localhost:5000"

// axios.defaults.headers
// axios.interceptors.request.use
// axios.interceptors.response.use

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    store.dispatch({
        type:"change_loading",
        payload:false//这里本应该是payload:true,但是我这里总是莫名其妙的出错，所以直接false,禁止用这个先
    })
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    store.dispatch({
        type:"change_loading",
        payload:false
    })
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
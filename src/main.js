import './assets/main.css'
import 'font-awesome/css/font-awesome.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'


import ElementPlus, { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';

import 'echarts'
import ECharts from 'vue-echarts'


  
import { getLocalStorage, getSessionStorage, removeLocalStorage, setSessionStorage } from "./common.js";
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.component('v-chart', ECharts)
app.provide('$axios',axios)

axios.defaults.timeout = 15000;

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (getLocalStorage('token')) {
        console.log('Nihao');
        config.headers.Authorization = getLocalStorage('token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

// 添加响应拦截器
axios.interceptors.response.use(res=>{
  let token=getSessionStorage('token');
  let new_token=res.headers.authorization;
  if(new_token===token)
    {
      setSessionStorage('token',new_token);
    }   
  if(res.data.code === 100)
        { 
          removeLocalStorage('token');
            console.log('NIHAO');
            router.replace('/');
            //所有
           ElMessage.error('登录失效');
            sessionStorage.clear();
        
        }
       return res;
},
)

export default axios;

app.mount('#app')

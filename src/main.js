import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css'

axios.defaults.baseURL = 'https://ferreteria.api.plaminoficial.com/api/'
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


import 'bootstrap/dist/js/bootstrap.js'

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')

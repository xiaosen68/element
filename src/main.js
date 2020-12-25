/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './api/api.js'
import http from './api/http.js'
import './plugins/element.js'
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.prototype.api = api;
Vue.prototype.http =http;
// process.env.VUE_APP_BASE_URL="http://47.96.91.58:8088/huqing"
Vue.config.productionTip = false
// console.log(process.env.VUE_APP_BASE_URL)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

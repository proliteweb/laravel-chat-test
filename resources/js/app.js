require('./bootstrap');
import Vue from 'vue';
import App from './App.vue';

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://dealok/api';
axios.interceptors.request.use(function (config) {
    // const token = '1|Z2IY8r4InPuxsEpAspelLRERzwMkfA4JnRuuF1KA';
    const token = '123';
    config.headers.Authorization =  'Bearer ' + token;

    return config;
});

Vue.use(VueAxios, axios)

window.Vue = Vue;
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router
})
.$mount('#app')

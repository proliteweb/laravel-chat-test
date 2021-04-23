window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
window.Vue = require('vue');
import SocketClient from 'socket.io-client';
import Echo from 'laravel-echo';
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from 'axios'

window.io = SocketClient;
// const host = 'api.dealok.comnd-x.com'
const host = 'dealok'

axios.defaults.baseURL = 'http://' + host + '/api';
Vue.use(VueAxios, axios)
if (!localStorage.getItem('authToken')) {
    const login = prompt('email', 'performer@qq.com')
    const password = 'qweqweqwe';
    axios.post('login', {
        login, password
    }).then(({data}) => {
        localStorage.setItem('authToken', data.token);
    })
}
window.authToken = localStorage.getItem('authToken')

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + window.authToken;
    return config;
});

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://' + host + ':6001',
    auth: {
        headers: {
            Authorization: 'Bearer ' + window.authToken,
        },
    },
});

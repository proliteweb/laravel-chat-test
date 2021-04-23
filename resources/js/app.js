require('./bootstrap');
import Vue from 'vue';
import App from './App.vue';

import router from './router'
import VueChatScroll from 'vue-chat-scroll'
import Notifications from 'vue-notification'
import 'es6-promise/auto'
import store from "./store";


Vue.use(VueChatScroll)
Vue.use(Notifications)

window.Vue = Vue;
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
})
.$mount('#app')

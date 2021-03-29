require('./bootstrap');
import Vue from 'vue';
import App from './App.vue';

// window.Vue = Vue;
Vue.config.productionTip = false

// Vue.component('chat', './components/Chat');
new Vue({
    el: '#app',
    render: h => h(App)
})

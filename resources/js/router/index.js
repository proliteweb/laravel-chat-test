import Vue from 'vue'
import Router from 'vue-router'

import Chat from '../components/Chat'
import Deal from '../components/Deal'
import Deals from '../components/Deals'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/chats/:id',
            component: Chat
        },
        {
            path: '/deals',
            component: Deals
        },
        {
            path: '/deals/:slug',
            component: Deal,
            props: true,
        }
    ],
    mode: 'history'
});


export default router
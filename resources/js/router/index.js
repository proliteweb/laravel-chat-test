import Vue from 'vue'
import Router from 'vue-router'

import Chat from '../components/Chat'
import Chats from '../components/Chats'
import Deal from '../components/Deal'
import Deals from '../components/Deals'
import MyDeals from '../components/MyDeals'
import NotificationConfig from '../components/cabinet/NotificationConfig'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/chats/:id',
            component: Chat
        },
        {
            path: '/chats',
            component: Chats
        },
        {
            path: '/deals',
            component: Deals
        },
        {
            path: '/my-deals',
            component: MyDeals
        },
        {
            path: '/deals/:slug',
            component: Deal,
            props: true,
        },
        {
            path: '/cabinet/notifications/config',
            component: NotificationConfig,
            props: true,
        }
    ],
    mode: 'history'
});


export default router

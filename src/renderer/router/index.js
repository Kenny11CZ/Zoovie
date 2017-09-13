import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing',
            component: require('@/components/General/Landing')
        },
        {
            path: '/home',
            name: 'home',
            component: require('@/components/General/Home')
        },
        {
            path: '/new',
            name: 'new-movie',
            component: require('@/components/Movie/New')
        },
        {
            path: '/edit/:id',
            name: 'edit-movie',
            component: require('@/components/Movie/Edit')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

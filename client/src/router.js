import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contract',
      name: 'contract',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "contract" */ './views/Contract.vue'),
    },
    {
      path: '/vue',
      name: 'vue',
      component: () => import(/* webpackChunkName: "vue" */ './views/Vue.vue'),
    },
  ],
});

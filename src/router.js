import Vue from 'vue';
import Router from 'vue-router';

import ListTarefas from './pages/ListTarefas.vue';
import ListUsers from './pages/ListUsers.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListUsers,
    },{
      path: '/user/:id',
      component: ListTarefas,
    }, {
        path: '*'
      , component: ListUsers
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

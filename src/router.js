import Vue from 'vue';
import Router from 'vue-router';

import ListTarefas from './pages/ListTarefas.vue';
import Tarefa from './pages/Tarefa.vue';
import ListUsers from './pages/ListUsers.vue';
import Page404 from './pages/404.vue';
import Usuario from './pages/Usuario.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListUsers,
    },{
      path: '/user/new',
      component: Usuario,
    }, {
      path: '/user/:id',
      component: ListTarefas,
    }, {
      path: '/task/new/:userId',
      component: Tarefa,
    }, {
      path: '/task/edit/:taskId',
      component: Tarefa,
    }, {
      path: '/user/edit/:id',
      component: Usuario,
    }, {
        path: '*'
      , component: Page404
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

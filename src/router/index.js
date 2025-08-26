import {createRouter, createWebHistory} from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import AboutView from '@/views/AboutView.vue';
import ExcursionView from '@/views/ExcursionView.vue';
import VehiculesView from '@/views/VehiculesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: AboutView
    },
    {
      path: '/excursions',
      name: 'excursion',
      component: ExcursionView
    },
    {
      path: '/vehicules',
      name: 'vehicules',
      component: VehiculesView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]})

export default router
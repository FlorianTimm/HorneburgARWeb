import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AR from '../views/AR.vue';
import Liste from '../views/Liste.vue';
import Orbit from '../views/Orbit.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/ar',
    name: 'AR',
    component: AR,
  },
  {
    path: '/liste',
    name: 'Liste',
    component: Liste,
  },
  {
    path: '/orbit',
    name: 'Orbit',
    component: Orbit,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

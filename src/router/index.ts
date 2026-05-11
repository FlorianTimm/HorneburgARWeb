import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/ar',
    name: 'AR',
    component: () => import('../views/AR.vue'),
  },
  
  {
    path: '/orbit',
    name: 'Liste',
    component: () => import('../views/ModelList.vue'),
  },
 {
    path: '/orbit/:model',
    name: 'Orbit',
    component: () => import('../views/ModelOrbit.vue'),
    },
    
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: () => import('../views/ArtifactsList.vue'),
  },
  {
    path: '/artifacts/:artifact',
    name: 'ArtifactDetail',
    component: () => import('../views/ArtifactsViewer.vue'),
    },
    {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  }
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'


import HomePage from '../views/HomePage.vue'
import AR from '../views/AR.vue';
import Liste from '../views/ModelList.vue';
import Orbit from '../views/ModelOrbit.vue';
import Artifacts from '@/views/ArtifactsList.vue';
import ArtifactsViewer from '@/views/ArtifactsViewer.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/ar',
    name: 'AR',
    component: AR,
  },
  
  {
    path: '/orbit',
    name: 'Liste',
    component: Liste,
  },
 {
    path: '/orbit/:model',
    name: 'Orbit',
    component: Orbit,
    },
    
  {
    path: '/artifacts',
    name: 'Artifacts',
    component: Artifacts,
  },
  {
    path: '/artifacts/:artifact',
    name: 'ArtifactDetail',
    component: ArtifactsViewer,
  }
  ],
})

export default router

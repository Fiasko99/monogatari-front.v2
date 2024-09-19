import { createRouter, createWebHistory } from 'vue-router'
import main from './main';
import location from './location';
import character from './character';
import auth from './auth';
import profile from './profile';
import area from './area';
import region from './region';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    main,
    location,
    character,
    auth,
    profile,
    area,
    region,
  ]
})

export default router

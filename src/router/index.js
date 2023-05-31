import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Methods',
        component: () => import('@/views/Methods.vue'),
      },
    ],
  },

  {
    path: '/schemas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Schemas',
        component: () => import('@/views/Schemas.vue'),
      },
    ],
  },

  {
    path: '/playground',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Playground',
        component: () => import('@/views/Playground.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('api'),
  routes,
});

export default router;

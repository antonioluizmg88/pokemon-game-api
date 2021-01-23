import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/player/:playerId',
    name: 'player',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Players.vue'),
  },
  {
    path: '/player/:playerId/pokemon/:pokemonId',
    name: 'pokemon',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Pokemon.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'create-player',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CreatePlayer.vue'),
  },
  {
    path: '/players',
    name: 'players',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Players.vue'),
  },
  {
    path: '/player/:playerId',
    name: 'player',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Player.vue'),
  },
  {
    path: '/player/:playerId/carrying',
    name: 'carrying',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Carrying.vue'),
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

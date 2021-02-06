import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'create-player',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CreatePlayer.vue'),
  },
  {
    path: '/pokemons-selection',
    name: 'pokemons-selection',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PokemonsSelection.vue'),
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

router.beforeEach(async (to, from) => {
  // const store = useStore()
  const playerId = localStorage.getItem('playerId')

  // Redirect to player creation if not playerId is found
  if (!playerId && to.name !== 'create-player') {
    console.info(`Player unknown. Redirecting to create a new player...`)
    router.push({ name: 'create-player' })
    return false
  }

  if (to.name === 'create-player') {
    return true
  }

  // Fetch player
  if (!store.state.player) {
    console.info(`Player does not exist in the store. Fetching from API...`)
    await store.dispatch('fetchPlayer', playerId)
  }

  // Redirect to Pokemon selection if carrying is empty
  const player = store.state.player

  if (player.pokemons.carrying.length < 6 && to.name !== 'pokemons-selection') {
    console.info(
      `Player has less than 6 pokemons. Redirecting to pokemons selection...`
    )
    router.push({ name: 'pokemons-selection' })
  }
})

export default router

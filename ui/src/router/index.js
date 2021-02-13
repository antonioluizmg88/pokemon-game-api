import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/create-player',
    name: 'create-player',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CreatePlayer.vue'),
  },
  {
    path: '/pokemon-selection',
    name: 'pokemon-selection',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PokemonSelection.vue'),
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

router.beforeEach(async to => {
  // const store = useStore()
  const playerId = localStorage.getItem('playerId')
  let player = store.state.player

  // Redirect to player creation if no playerId is found
  if (!playerId && to.name !== 'create-player') {
    console.info(`Unknown player. Redirecting to create a new player...`)
    await router.push({ name: 'create-player' })
  }

  // Fetch player
  if (!player && playerId) {
    console.info(`Player does not exist in the store. Fetching from API...`)
    await store.dispatch('fetchPlayer', { playerId })
    player = store.state.player
  }

  // Redirect to Pokemon selection if carrying is empty
  if (
    player &&
    player.pokemons.carrying.length < 6 &&
    to.name !== 'pokemon-selection'
  ) {
    console.info(
      `Player has less than 6 pokemons. Redirecting to Pokemon selection...`
    )
    await router.push({ name: 'pokemon-selection' })
  }

  if (
    player &&
    player.pokemons.carrying.length >= 6 &&
    to.name === 'pokemon-selection'
  ) {
    console.info(`Player already has 6 pokemons. Redirecting...`)
    await router.push({ name: 'player', params: { playerId } })
  }

  // Player already exists
  if (player && to.name === 'create-player') {
    await router.push({ name: 'player', params: { playerId } })
  }
})

export default router

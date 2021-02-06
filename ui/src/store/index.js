import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    player: null,
    players: [],
    pokemons: [],
  },
  getters: {
    getPlayer: state => playerId => state.players.find(o => o._id === playerId),
  },
  mutations: {
    setPlayer(state, payload) {
      state.player = payload
    },
    setPlayers(state, payload) {
      state.players = payload
    },
    setPokemons(state, payload) {
      state.pokemons = payload
    },
  },
  actions: {
    async catchPokemon({ commit, state }, pokemonName) {
      try {
        const playerId = state.player._id
        const { status, data } = await axios.post(
          `http://localhost:3000/player/${playerId}/pokemons/${pokemonName}`
        )

        if (status !== 200) {
          console.error(`Catch pokemon returned ${status}`)
          return
        }

        commit('setPlayer', data)
      } catch (e) {
        console.error(`Unable to catch pokemon "${pokemonName}": ${e.message}`)
      }
    },
    async createPlayer({ commit }, payload) {
      try {
        const { status, data } = await axios.post(
          `http://localhost:3000/player`,
          payload
        )

        if (status !== 200) {
          console.error(`Create player returned ${status}`)
          return
        }

        commit('addPlayer', data)
        localStorage.setItem('playerId', data._id)
      } catch (e) {
        console.error(`Unable to create player: ${e.message}`)
      }
    },
    async fetchPlayer({ commit, state }, playerId) {
      try {
        const { status, data } = await axios.get(
          `http://localhost:3000/player/${playerId}`
        )

        if (status !== 200) {
          console.error(`Fetch player returned ${status}`)
          return
        }

        commit('setPlayer', data)
      } catch (e) {
        console.error(
          `Unable to fetch player with ID ${playerId}: ${e.message}`
        )
      }
    },
    async fetchPlayers({ commit }) {
      try {
        const { status, data } = await axios.get(
          `http://localhost:3000/players`
        )

        if (status !== 200) {
          console.error(`Fetch players returned ${status}`)
          return
        }

        commit('setPlayers', data)
      } catch (e) {
        console.error(`Unable to fetch players: ${e.message}`)
      }
    },
    async fetchPokemons({ commit }) {
      try {
        const { status, data } = await axios.get(
          `http://localhost:3000/pokemons`
        )

        if (status !== 200) {
          console.error(`Fetch pokemons returned ${status}`)
          return
        }

        commit('setPokemons', data)
      } catch (e) {
        console.error(`Unable to fetch pokemons: ${e.message}`)
      }
    },
  },
  modules: {},
})

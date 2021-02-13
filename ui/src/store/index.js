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
    removePokemon(state, pokemonId) {
      const { pokemons } = state.player
      state.player.pokemons = [
        ...pokemons.carrying,
        ...pokemons.deposit,
      ].filter(o => o._id !== pokemonId)
    },
  },
  actions: {
    async catchPokemon({ commit, state }, pokemonName) {
      try {
        const playerId = state.player._id
        const { status, data } = await axios.post(
          `http://localhost:3000/player/${playerId}/catch/${pokemonName}`
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

        commit('setPlayer', data)
        localStorage.setItem('playerId', data._id)
      } catch (e) {
        console.error(`Unable to create player: ${e.message}`)
      }
    },
    async fetchPlayer({ commit }, { playerId }) {
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
    async releasePokemon({ dispatch, state }, { pokemonId }) {
      try {
        const { player } = state
        const { status } = await axios.delete(
          `http://localhost:3000/player/${player._id}/pokemon/${pokemonId}`
        )

        if (status !== 204) {
          console.error(`Release Pokemon returned ${status}`)
          return
        }

        const playerId = state.player._id
        dispatch('fetchPlayer', { playerId })
      } catch (e) {
        console.error(`Unable to release Pokemon: ${e.message}`)
      }
    },
  },
  modules: {},
})

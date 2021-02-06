import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    player: {},
    players: [],
  },
  getters: {
    getPlayer: state => playerId => state.players.find(o => o._id === playerId),
  },
  mutations: {
    addPlayer(state, payload) {
      state.players.push(payload)
      state.player = payload
    },
    setPlayers(state, payload) {
      state.players = payload
    },
  },
  actions: {
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
      } catch (e) {
        console.error(`Unable to create player: ${e.message}`)
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
  },
  modules: {},
})

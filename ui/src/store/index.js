import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    players: [],
  },
  getters: {
    getPlayer: state => playerId => state.players.find(o => o._id === playerId),
  },
  mutations: {
    setPlayers(state, payload) {
      state.players = payload
    },
  },
  actions: {
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

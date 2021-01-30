<template>
  <div class="home">
    <ul class="players">
      <li
        v-for="player in players"
        v-bind:key="player._id"
        v-text="player.name"
        @click="
          router.push({ name: 'player', params: { playerId: player._id } })
        "
        class="player"
      />
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const store = useStore()
    const players = computed(() => {
      return store.state.players
    })

    onMounted(() => {
      store.dispatch('fetchPlayers')
    })

    return {
      players,
      router,
    }
  },
}
</script>

<style lang="scss" scoped>
.players {
  list-style: none;
  display: flex;
}

.player {
  font-weight: bold;
  border: solid 1px gray;
  padding: 16px;
  border-radius: 4px;
  margin: 4px;
  min-width: 200px;
}
</style>

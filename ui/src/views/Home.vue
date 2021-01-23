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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    let players = ref([])

    const fetchPlayers = async () => {
      try {
        const { status, data } = await axios.get(
          'http://localhost:3000/players'
        )
        players.value = status === 200 ? data : players
      } catch (e) {
        alert(`Deu ruim: ${e.message}`)
      }
    }

    onMounted(() => {
      fetchPlayers()
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

<template>
  <div v-if="player" class="player-view">
    <div class="player">
      <h1>{{ player.name }}</h1>
      <h3>{{ gender }}</h3>
    </div>

    <h2>Carrying</h2>
    <PokemonList :list="player.pokemons.carrying" :player-id="player._id" />
    <h2>Deposit</h2>
    <PokemonList :list="player.pokemons.deposit" :player-id="player._id" />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PokemonList from '@/components/PokemonList.vue'

export default {
  components: {
    PokemonList,
  },
  setup() {
    const route = useRoute()
    let player = ref()

    const fetchPlayer = async () => {
      try {
        const { status, data } = await axios.get(
          `http://localhost:3000/player/${route.params.playerId}`
        )
        player.value = status === 200 ? data : player
      } catch (e) {
        console.error(e)
      }
    }

    onMounted(() => {
      fetchPlayer()
    })

    const gender = computed(() => {
      return player.value.gender === 'M' ? 'Male' : 'Female'
    })

    return {
      gender,
      player,
    }
  },
}
</script>

<style lang="scss" scoped>
.player {
  h1 {
    text-transform: capitalize;
  }
}
</style>

<template>
  <div v-if="player" class="player-view">
    <div class="player">
      <h1>{{ player.name }}</h1>
      <h3>{{ gender }}</h3>
    </div>

    <h2>Carrying</h2>
    <PokemonList :list="player.pokemons.carrying" :player-id="player._id" />
    <button
      @click="navigateToCarrying"
      class="rounded-md bg-red-800 text-white p-4"
    >
      Open Carrying Bag
    </button>
    <h2>Deposit</h2>
    <PokemonList :list="player.pokemons.deposit" :player-id="player._id" />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import PokemonList from '@/components/PokemonList.vue'

export default {
  components: {
    PokemonList,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const playerId = route.params.playerId
    const player = computed(() => store.getters.getPlayer(playerId))
    const gender = computed(() =>
      player.value.gender === 'M' ? 'Male' : 'Female'
    )
    const navigateToCarrying = () =>
      router.push({ name: 'carrying', param: { playerId } })

    onMounted(() => {
      store.dispatch('fetchPlayers')
    })

    return {
      gender,
      player,
      navigateToCarrying,
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

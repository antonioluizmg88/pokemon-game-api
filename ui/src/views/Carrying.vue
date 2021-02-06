<template>
  <div v-if="player && pokemons.length > 0" class="carrying flex flex-row">
    <div class="flex-shrink">
      <Pokemon
        :pokemon="pokemons[0]"
        :main="true"
        class="min-w-max m-1 mt-14"
      />
    </div>
    <div class="flex-grow">
      <Pokemon
        v-for="pokemon in pokemons.slice(1)"
        v-bind:key="pokemon._id"
        :pokemon="pokemon"
        class="min-w-max m-1"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Pokemon from '@/components/carrying/Pokemon.vue'

export default {
  components: {
    Pokemon,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const playerId = route.params.playerId
    const player = computed(() => store.getters.getPlayer(playerId))
    const pokemons = computed(() => player.value?.pokemons?.carrying || [])

    onMounted(() => {
      store.dispatch('fetchPlayers')
    })

    return {
      player,
      pokemons,
    }
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="players">
    <Card class="w-full">
      <template #title>Players</template>
      <ul class="players__list flex flex-col justify-start p-4 w-full">
        <li
          v-for="player in players"
          v-bind:key="player._id"
          @click="
            router.push({ name: 'player', params: { playerId: player._id } })
          "
          class="players__item flex m-2 uppercase items-center bg-gray-700 rounded-md px-4 py-2 border-2 border-solid border-gray-500 cursor-pointer"
        >
          <span class="flex-grow text-gray-300 text-xl shadow-md text-shadow-1">
            {{ player.name }}
          </span>
          <span>{{ countPokemons(player.pokemons) }} Pokemons</span>
        </li>
      </ul>
    </Card>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Players',
  setup() {
    const router = useRouter()
    const store = useStore()
    const players = computed(() => {
      return store.state.players
    })

    const countPokemons = ({ carrying, deposit }) =>
      carrying.length + deposit.length

    onMounted(() => {
      store.dispatch('fetchPlayers')
    })

    return {
      countPokemons,
      players,
      router,
    }
  },
}
</script>

<style lang="scss" scoped>
.players {
  &__item:hover {
    @apply border-gray-200 text-gray-200;
  }
}
</style>

<template>
  <div v-if="player" class="player-view">
    <div class="player flex flex-col relative">
      <h1 class="title bg-gray-800 py-4 px-8 text-6xl rounded rounded-bl-none shadow">
        {{ player.name }}
      </h1>
      <div class="xp-container relative bg-gray-700 p-4 pr-2 rounded-bl minw-12 self-start">
        <StatBar 
          text="XP" 
          color="blue-500" 
        />
      </div>
    </div>

    <Card>
      <template #title>Carrying ({{ player.pokemons.carrying.length }})</template>
      <PokemonList 
        :list="player.pokemons.carrying" 
        :player-id="player._id" 
        class="player__carrying-list" 
      />
      <template #actions>
        <Button @click="navigateToCarrying">Open</Button>
      </template>
    </Card>

    <Card :colapsed="true">
      <template #title>Deposit ({{ player.pokemons.deposit.length }})</template>
      <PokemonList :list="player.pokemons.deposit" :player-id="player._id" />
      <template v-slot:actions>
        <Button>Open</Button>
      </template>
    </Card>
    
    <h2></h2>
    
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import PokemonList from '@/components/PokemonList.vue'
import StatBar from "@/components/bars/StatBar.vue";

export default {
  components: {
    PokemonList,
    StatBar,
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
  .xp-container {
    &:after {
      content: '';
      position: absolute;
      top: -6px;
      right: -51px;
      width: 0; 
      height: 0; 
      border-top: 38px solid;
      @apply border-gray-700;
      border-left: 38px solid transparent;
      border-right: 38px solid transparent;
      transform: rotate(135deg)
    }
  }
}
</style>

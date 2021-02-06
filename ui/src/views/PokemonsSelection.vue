<template>
  <div class="pokemons-selection w-full">
    <h1>Choose your Pokemons</h1>

    <Card>
      <template #title>Chosen</template>
      <div class="choosen flex">
        <div
          v-for="pokemon in player.pokemons.carrying"
          v-bind:key="pokemon._id"
        >
          <img :src="pokemon.metadata.sprites.front_default" />
        </div>
      </div>
      <template #actions>
        <Button @click="confirm">Confirm</Button>
      </template>
    </Card>

    <Card>
      <template #title>Search</template>
      <div class="search-container w-full">
        <Input
          v-model="searchTerm"
          name="search-input"
          placeholder="Type a Pokemon name"
        />
        <List :items="results" @click:item="addPokemon" />
      </div>
    </Card>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'PokemonsSelection',
  setup() {
    const store = useStore()
    const router = useRouter()
    const player = store.state.player
    const searchTerm = ref('')
    const results = computed(() => {
      return store.state.pokemons
        .filter(({ name }) => name.indexOf(searchTerm.value) !== -1)
        .map(({ name }) => name.toUpperCase())
    })
    const addPokemon = ({ index }) => {
      const { name } = store.state.pokemons[index]
      store.dispatch('catchPokemon', name)
    }
    const confirm = () =>
      router.push({ name: 'player', params: { playerId: player._id } })

    onMounted(() => {
      store.dispatch('fetchPokemons')
    })

    console.log(player)

    return {
      addPokemon,
      confirm,
      player,
      results,
      searchTerm,
    }
  },
}
</script>

<style lang="scss" scoped></style>

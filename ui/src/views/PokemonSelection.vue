<template>
  <h1 class="text-5xl m-8">Choose your Pokemons</h1>
  <div
    @keyup.esc.exact="clearSelectedListItem"
    @keyup.enter.exact="
      selectedIndex >= 0 && catchPokemon({ index: selectedIndex })
    "
    class="pokemon-selection flex flex-col lg:flex-row-reverse p-4"
  >
    <Card class="m-4 lg:flex-1">
      <template #title>Chosen</template>
      <div class="choosen flex flex-wrap items-center justify-center p-4">
        <div
          v-for="(pokemon, index) in chosen"
          v-bind:key="index"
          class="chosen__item m-2 relative"
        >
          <PokemonSprite
            v-if="pokemon"
            :sprites="pokemon.metadata.sprites"
            class="absolute m-auto w-20 h-20 z-10"
          />
          <Ball
            class="w-20 h-20"
            :class="[pokemon ? 'opacity-20' : 'opacity-70']"
          />
          <div
            v-if="pokemon"
            @click="releasePokemon(pokemon._id)"
            class="absolute flex justify-center right-0 bottom-0 text-white bg-red-800 hover:bg-red-700 w-7 h-7 rounded-full cursor-pointer z-20"
          >
            x
          </div>
        </div>
      </div>
      <template #actions>
        <Button :disabled="!ready" @click="confirm">Continue</Button>
      </template>
    </Card>

    <Card class="m-4 lg:flex-1">
      <template #title>Search</template>
      <div class="search-container flex flex-col p-2 w-full">
        <Input
          v-model="searchTerm"
          name="search-input"
          placeholder="Type a Pokemon name"
          class="m-4"
          ref="searchInput"
          autocomplete="off"
          autofocus
          @keyup.down.exact="onArrowDown"
        />
        <List
          v-model:selected="selectedIndex"
          :items="results"
          @click:item="catchPokemon"
          class="m-4"
        >
          <template #default="{ item }">
            <span class="capitalize">{{ item }}</span>
          </template>
        </List>
      </div>
    </Card>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Ball from '@/components/base/Ball.vue'
import PokemonSprite from '@/components/pokemon/PokemonSprite.vue'

export default {
  name: 'PokemonSelection',
  components: {
    Ball,
    PokemonSprite,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const player = computed(() => store.state.player)
    const ready = computed(
      () => store.state.player.pokemons.carrying.length === 6
    )

    // Search
    const selectedIndex = ref(null)
    const searchTerm = ref('')
    const searchInput = ref(null)
    const results = computed(() => {
      return store.state.pokemons
        .filter(({ name }) => name.indexOf(searchTerm.value) !== -1)
        .map(({ name }) => name)
    })
    const clearSelectedListItem = () => {
      selectedIndex.value = null
      searchInput.value.$el.focus()
      // console.log(searchInput.value.$el)
    }

    // Key navigation
    const onArrowDown = () => {
      if (!Number.isInteger(selectedIndex.value)) {
        selectedIndex.value = 0
      }
    }

    // Chosen Pokemons
    const chosen = computed(() => {
      let chosen = [...Array(6)]
      const { carrying } = store.state.player.pokemons
      if (carrying.length <= 6) {
        return chosen.map((_, index) =>
          index < carrying.length ? carrying[index] : null
        )
      }

      return chosen
    })

    const catchPokemon = ({ index }) => {
      if (
        !Number.isInteger(index) ||
        player.value.pokemons.carrying.length >= 6
      ) {
        return false
      }

      const name = results.value[index]
      store.dispatch('catchPokemon', name)

      searchTerm.value = ''
      selectedIndex.value = null
      searchInput.value.$el.focus()
    }

    const releasePokemon = pokemonId =>
      store.dispatch('releasePokemon', { pokemonId })

    const confirm = () => {
      if (player.value.pokemons.carrying < 6) {
        return false
      }

      router.push({ name: 'player', params: { playerId: player.value._id } })
    }

    onMounted(() => {
      store.dispatch('fetchPokemons')
      searchInput.value.$el.focus()
    })

    return {
      catchPokemon,
      clearSelectedListItem,
      confirm,
      onArrowDown,
      releasePokemon,
      chosen,
      player,
      ready,
      results,
      searchInput,
      searchTerm,
      selectedIndex,
    }
  },
}
</script>

<style lang="scss" scoped></style>

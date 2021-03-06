<template>
  <div v-if="pokemon" class="pokemon">
    <h1 class="pokemon__name">
      <img :src="pokemon.metadata.sprites.front_default" />
      {{ pokemon.name }}
    </h1>
    <ul class="pokemon__types">
      <li
        v-for="({ type }, index) in pokemon.metadata.types"
        v-bind:key="index"
      >
        {{ type.name }}
      </li>
    </ul>
    <ul class="pokemon__abilities">
      <h2>Abilities</h2>
      <li
        v-for="({ ability }, index) in pokemon.metadata.abilities"
        v-bind:key="index"
      >
        {{ ability.name }}
      </li>
    </ul>
    <ul class="pokemon__sprites">
      <h2>Sprites</h2>
      <br />
      <li v-for="(sprite, key) in sprites" v-bind:key="key">
        <img v-if="sprite" :src="sprite" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'Pokemons',
  setup() {
    const route = useRoute()
    const store = useStore()
    const pokemon = computed(() => {
      const player = store.getters.getPlayer(route.params.playerId)

      if (!player) {
        return null
      }

      const pokemons = player.pokemons.carrying.concat(player.pokemons.deposit)
      return pokemons.find(({ _id }) => _id === route.params.pokemonId)
    })

    const sprites = computed(() =>
      Object.entries(pokemon.value.metadata.sprites)
        .filter(([key]) => !['other', 'versions'].includes(key))
        .filter(([key, value]) => value)
        .filter(([key]) => !key.includes('_female'))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value,
          }),
          {}
        )
    )

    onMounted(() => {
      store.dispatch('fetchPlayers')
    })

    return {
      pokemon,
      sprites,
    }
  },
}
</script>

<style lang="scss" scoped>
.pokemon {
  &__name {
    display: flex;
    align-items: center;
    text-transform: capitalize;
  }

  &__types {
    list-style: none;
    display: flex;
    align-items: center;

    li {
      border: solid 1px gray;
      border-radius: 16px;
      padding: 2px 8px;
      margin-right: 4px;
    }
  }

  &__sprites {
    list-style: none;
    display: flex;
    align-items: center;
  }
}
</style>

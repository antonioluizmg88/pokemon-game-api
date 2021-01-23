<template>
  <ul class="pokemon-list">
    <li
      v-for="pokemon in list"
      v-bind:key="pokemon._id"
      class="pokemon-list__item"
    >
      <img
        :src="pokemon.metadata.sprites.front_default"
        @click="
          router.push({
            name: 'pokemon',
            params: { playerId, pokemonId: pokemon._id },
          })
        "
      />
    </li>
  </ul>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'PokemonList',
  props: {
    playerId: String,
    list: Array,
  },
  setup() {
    const router = useRouter()
    return { router }
  },
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  list-style: none;
  display: flex;

  &__item {
    border: solid 1px gray;
    border-radius: 4px;
    padding: 16px;
    margin: 8px;
  }
}
</style>

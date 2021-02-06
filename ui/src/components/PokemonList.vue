<template>
  <div class="pokemon-list flex flex-wrap justify-start">
    <div
      v-for="pokemon in list"
      v-bind:key="pokemon._id"
      class="pokemon-list__item flex flex-col m-4 items-center cursor-pointer flex-grow"
      @click="
          router.push({
            name: 'pokemon',
            params: { playerId, pokemonId: pokemon._id },
          })
        "
    >
      <img
        :src="pokemon.metadata.sprites.front_default"
        class="pokemon-list__item-image z-0"
      />
      <span class="pokemon-list__item-name uppercase bg-gray-700 text-gray-300 text-xl shadow-md text-shadow-1 rounded-md px-4 py-2 z-1 border-2 border-solid border-gray-500" v-text="pokemon.name" /> 
    </div>
  </div>
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
  &__item:hover {
    .pokemon-list__item-image {
      top: 0;
    }

    .pokemon-list__item-name {
      @apply border-gray-200 text-gray-200;
    }
  }
  
  &__item {
    position: relative;
    padding-top: 88px;  
  }

  &__item-image {
    position: absolute;
    top: 18px;
    transition: all .1s ease-out;
  }

  &__item-name {
    text-shadow: 2px 2px black;
  }
}
</style>

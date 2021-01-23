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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  setup() {
    const route = useRoute()
    let pokemon = ref()
    let sprites = ref({})

    const fetchPlayer = async () => {
      let player

      try {
        const { data } = await axios.get(
          `http://localhost:3000/player/${route.params.playerId}`
        )
        player = data
      } catch (e) {
        console.error(e)
      }

      const pokemons = player.pokemons.carrying.concat(player.pokemons.deposit)
      pokemon.value = pokemons.find(({ _id }) => _id === route.params.pokemonId)
      sprites.value = Object.entries(pokemon.value.metadata.sprites)
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
    }

    onMounted(() => {
      fetchPlayer()
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

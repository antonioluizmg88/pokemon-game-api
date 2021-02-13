<template>
  <img :src="sprite" />
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'PokemonSprite',
  props: {
    position: {
      type: String,
      default: 'front',
      validate: value => ['front', 'back'].includes(value),
    },
    variant: {
      type: String,
      default: 'default',
      validate: value => ['default', 'shiny'].includes(value),
    },
    female: {
      type: Boolean,
      default: false,
    },
    sprites: Object,
  },
  setup(props) {
    const sprite = computed(() => {
      const genderSuffix = props.female ? '_female' : ''
      return props.sprites[`${props.position}_${props.variant}${genderSuffix}`]
    })

    return {
      sprite,
    }
  },
}
</script>

<style scoped></style>

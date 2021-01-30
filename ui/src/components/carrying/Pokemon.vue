<template>
  <div
    class="pokemon flex border-gray-700 rounded border-2 border-solid bg-gradient-to-b from-blue-400 to-blue-200"
    :class="cssClasses"
  >
    <div class="flex flex-row flex-grow">
      <img
        :src="image"
        class="avatar rounded-full absolute border-2
      border-black border-solid bg-white w-20 h-20"
        :style="{ marginTop: main ? '-28px' : '-2px' }"
      />
      <div class="flex flex-col justify-center ml-14">
        <span
          class="uppercase font-bold text-white text-xl"
          v-text="pokemon.name"
        />
        <span class="text-white font-bold text-md ml-4">Lv{{ level }}</span>
      </div>
    </div>
    <span
      class="flex flex-col my-4 mx-2 text-white text-right font-bold min-h-full"
    >
      <StatBar text="HP" :total="hp" :current="hp" />
      <span class="text-md">{{ hp }} / {{ hp }}</span>
    </span>
  </div>
</template>

<script>
import { computed } from 'vue'
import StatBar from '@/components/bars/StatBar.vue'

export default {
  name: 'Pokemon',
  components: {
    StatBar,
  },
  props: {
    main: {
      type: Boolean,
      default: false,
    },
    pokemon: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { main, pokemon } = props
    const image = pokemon?.metadata?.sprites.front_default
    const level = 18
    const { base_stat: hp } = pokemon.metadata.stats.find(
      o => o.stat.name === 'hp'
    )

    const cssClasses = computed(() => ({
      'flex-row': !main,
      'flex-col': main,
      'border-4': main,
      'border-2': !main,
    }))

    return {
      cssClasses,
      image,
      level,
      hp,
    }
  },
}
</script>

<style lang="scss" scoped>
.pokemon {
  margin-left: 38px;
  text-shadow: 1px 1px black;
}

.avatar {
  margin: -2px 0 0 -38px;
}
</style>

<template>
  <div class="container mx-auto max-w-5xl mx-auto p-4">
    <router-view class="" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => router.back()
    return {
      goBack,
    }
  },
}
</script>

<style lang="sass">
@font-face
  font-family: 'Pokemon Fire Red'
  font-style: normal
  font-weight: normal
  src: local('Pokemon Fire Red Regular') url('~@/assets/pokemon_fire_red.woff') format('woff')

#app
  font-family: monospace
  // font-family: 'Pokemon Fire Red Regular'
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-size: 16px
</style>

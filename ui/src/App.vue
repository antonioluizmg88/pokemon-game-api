<template>
  <router-view class="" />
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

<style lang="scss">
#app {
  @apply h-screen;
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
</style>

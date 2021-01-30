<template>
  <div
    class="stat-bar flex flex-row min-w-full bg-gray-700 border-gray-700 border-2 border-solid rounded-xl"
  >
    <span class="px-1 text-yellow-300 font-black leading-none">{{ text }}</span>
    <div class="flex-grow border-white border-2 border-solid rounded-lg h-4">
      <div class="rounded-lg bg-green-400 min-h-full"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    total: Number,
    current: Number,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.stat-bar {
  min-width: 200px;
}
</style>

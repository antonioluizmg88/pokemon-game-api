<template>
  <div
    class="stat-bar flex flex-row bg-gray-800 border-gray-800 border-2 border-solid rounded"
  >
    <span class="px-1 text-yellow-300 font-black leading-none">{{ text }}</span>
    <div class="flex-grow border-gray-700 border border-solid rounded h-4 shadow-inner">
      <div 
        class="rounded-sm min-h-full" 
        :class="['bg-' + color]"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    total: {
      type:Number,
      default: 0
    },
    current: {
      type:Number,
      default: 0
    },
    color: {
      type: String,
      default: () => 'gray-500'
    }
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

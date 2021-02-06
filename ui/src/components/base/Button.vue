<template>
  <button class="button rounded bg-red-800 leading-none text-white m-0 p-4">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: String,
  },
}
</script>

<style lang="scss" scoped>
.button {
  min-width: 100px;
}
</style>
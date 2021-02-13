<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
  },
}
</script>

<style lang="scss" scoped>
.button {
  @apply rounded bg-red-800 leading-none text-white;
  @apply m-0 p-4;

  &:hover {
    @apply bg-red-700;
  }
  &:disabled {
    @apply text-red-200 bg-red-900 cursor-default;
  }
  min-width: 100px;
}
</style>

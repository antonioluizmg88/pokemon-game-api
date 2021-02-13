<template>
  <div class="ball rounded-full relative">
    <div class="ball__semicircle-top"></div>
    <div class="ball__line-center"></div>
    <div class="ball__semicircle-bottom"></div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.ball {
  @apply border-solid border-gray-900 border-4;
  @apply bg-gradient-to-br from-white to-black;
  overflow: hidden;
  min-width: 42px;
  min-height: 42px;

  &__semicircle-top {
    @apply bg-red-700 bg-opacity-80;
    height: 50%;
  }

  &__semicircle-bottom {
    @apply bg-white bg-opacity-60;
    height: 50%;
  }

  &__line-center {
    @apply border-black border-solid border-2;
    margin: -2px auto 0 auto;
    width: 100%;

    &:before {
      @apply border-solid border-black border-4 rounded-full;
      @apply bg-gradient-to-br from-gray-300 to-white;
      content: '';
      position: absolute;
      height: 38%;
      width: 38%;
      margin: -18% 26%;
    }

    &:after {
      @apply rounded-full shadow;
      @apply bg-gray-200;
      content: '';
      position: absolute;
      height: 14%;
      width: 14%;
      margin: -7% 38%;
    }
  }
}
</style>

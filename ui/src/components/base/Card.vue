<template>
  <div class="card pt-8 pb shadow-lg">
    <h2
      v-if="slots.title" 
      class="card__title inline-block min-w-min px-8 py-4 rounded-tl text-xl bg-gray-800">
      <span class="card__title-text title">
        <slot name="title"></slot>
      </span>
    </h2>
    <div 
      class="card__content relative flex flex-col bg-gray-800 rounded rounded-tl-none"
      :class="{ colapsed }">
      <div class="card__text flex justify-center w-full z-0">
        <slot></slot>
      </div>
      <div
        v-if="slots.actions"
        class="card__actions flex inline-block justify-end self-end justify-self-end flex-grow z-1">
        <div class="card__actions-container relative bg-gray-900 p-2">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(_, { slots }) {
    return {
      slots
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  &__title {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 24px;
      right: -58px;
      width: 0; 
      height: 0; 
      border-top: 43px solid;
      @apply border-gray-800;
      border-left: 43px solid transparent;
      border-right: 43px solid transparent;
      transform: rotate(45deg)
    }
  }

  &__content {
    transition: all .6s ease-out;

    &.colapsed {
      max-height: 15rem;
      overflow: hidden;

      .card__actions {
        position: absolute;
        background: linear-gradient(transparent, rgba(0,0,0,0.4));
      }
    }
  }

  &__actions {
    right: 0;
    bottom: 0;
    width: 100%;

    &-container { 
      &:before {
      content: '';
      position: absolute;
      top: 26px;
      left: -60px;
      width: 0; 
      height: 0; 
      border-top: 45px solid;
      @apply border-gray-900;
      border-right: 45px solid transparent;
      border-left: 45px solid transparent;
      // border-top: 45px solid greenyellow;
      transform: rotate(315deg)
    }
    }
  }
}
</style>
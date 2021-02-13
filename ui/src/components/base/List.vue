<template>
  <div
    @keyup.up.exact="onArrowUp"
    @keyup.down.exact="onArrowDown"
    class="list flex flex-col justify-start"
  >
    <ul ref="list">
      <li
        v-for="(value, index) in items"
        v-bind:key="index"
        @click="emit('click:item', { index })"
        class="list__item"
        tabindex="0"
      >
        <span class="flex-grow text-gray-300 text-xl text-shadow-1">
          <slot :item="value">{{ value }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'List',
  props: {
    items: Array,
    focus: Number,
    selected: Number,
  },
  emits: ['update:selected', 'click:item'],
  setup(props, { emit }) {
    // const onFocus = index => emit('update:focus', index)

    watch(
      () => props.selected,
      value => {
        if (Number.isInteger(value)) {
          focusOnSelectedItem(value)
        }
      }
    )

    // Navigation
    const list = ref(null)
    const onArrowUp = e => {
      e.preventDefault()
      if (props.selected > 0) {
        emit('update:selected', props.selected - 1)
      }
    }
    const onArrowDown = e => {
      e.preventDefault()
      emit('update:selected', props.selected + 1)
    }
    const focusOnSelectedItem = index => {
      const listItems = list.value.querySelectorAll('li')
      listItems[index].focus()
    }

    return {
      emit,
      onArrowUp,
      onArrowDown,
      list,
    }
  },
}
</script>

<style lang="scss" scoped>
.list {
  &__item {
    @apply bg-gray-700 rounded-md;
    @apply my-2 px-4 py-2;
    @apply border-2 border-solid border-gray-500;
    @apply cursor-pointer;
    @apply flex items-center;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &:hover,
    &:focus,
    &-selected {
      @apply outline-none ring-2 ring-white text-white border-transparent;
    }
  }
}
</style>

<template>
  <ul class="list flex flex-col justify-start p-4 w-full">
    <li
      v-for="(value, index) in items"
      v-bind:key="index"
      class="list__item flex m-2 items-center bg-gray-700 rounded-md px-4 py-2 border-2 border-solid border-gray-500 cursor-pointer"
      @click="emit('click:item', { index })"
    >
      <span class="flex-grow text-gray-300 text-xl shadow-md text-shadow-1">
        {{ value }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    items: [Array],
  },
  emits: ['click:item'],
  setup(_, { emit }) {
    return {
      emit,
    }
  },
}
</script>

<style lang="scss" scoped></style>

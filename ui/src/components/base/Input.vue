<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    class="rounded bg-gray-700 rounded-md border-2 border-solid border-gray-500 m-2 p-4"
  />
</template>

<script>
import {} from 'vue'

export default {
  name: 'Input',
  props: {
    modelValue: {
      value: [String, Number],
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    return {
      emit,
    }
  },
}
</script>

<style lang="scss" scoped></style>

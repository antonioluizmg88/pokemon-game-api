<template>
  <select
    class="rounded bg-gray-700 rounded-md border-2 border-solid border-gray-500 p-4"
    @change="emit('update:modelValue', $event.target.value)"
  >
    <option value="" disabled="disabled" selected="selected">{{
      placeholder
    }}</option>
    <option
      v-for="(value, index) in items"
      v-bind:key="index"
      :value="index"
      :selected="modelValue === index"
    >
      {{ value }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    modelValue: [Object, String],
    items: {
      type: [Array, Object],
      default: [],
    },
    placeholder: String,
  },
  setup(_, { emit }) {
    return {
      emit,
    }
  },
}
</script>

<style lang="scss" scoped></style>

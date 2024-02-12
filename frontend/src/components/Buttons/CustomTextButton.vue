<template>
  <button
    class="h-full flex flex-row bg-gray-400 p-2 pe-3 pl-3 text-white font-bold rounded hover:bg-gray-800 "
    @click="buttonClicked"
    :disabled="props.disabled"
  >
    {{ props.buttonText }}

  </button>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits(['click']);

const buttonClicked = (): void => {
    emits('click');
}

</script>
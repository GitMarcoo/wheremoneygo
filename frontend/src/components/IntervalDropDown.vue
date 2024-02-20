<template>
    <select
      id="expenseInterval"
      v-model="intervalCopy"
      class="ml-1 font-bold m-2 bg-gray-50 border-0 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      @change="emits('intervalChanged', intervalCopy)"
    >
      <option
        v-for="(value, key) in Interval"
        :key="key"
      >
        {{ value }}
      </option>
    </select>
</template>

<script setup lang="ts">
import Interval from '@/models/Interval';
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
    interval: {
        type: String as () => Interval,
        required: true
    }
});

const emits = defineEmits(['intervalChanged']);

const intervalCopy = ref<Interval>(props.interval);

</script>
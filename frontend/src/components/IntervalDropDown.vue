<template>
  <div class="font-bold flex flex-row m-2">
    <label
      for="expenseInterval"
      class="ExpensePopOverLabel mr-2"
    >Interval:</label>
    <select
      id="expenseInterval"
      v-model="intervalCopy"
      class="ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      @change="$emit('intervalChanged', intervalCopy)"
    >
      <option
        v-for="(value, key) in Interval"
        :key="key"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import Interval from '@/models/Interval';
import { defineProps, ref } from 'vue';

const props = defineProps({
    interval: {
        type: String as () => Interval,
        required: true
    }
});

const intervalCopy = ref<Interval>(props.interval);

</script>
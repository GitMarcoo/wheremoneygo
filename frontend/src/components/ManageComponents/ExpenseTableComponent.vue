<template>
  <div>
    <div class="relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-sm"
            >
              {{ title }}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-sm"
            >
              Amount <span :class="{'text-green-600': totalAmount > 0, 'text-red-600': totalAmount < 0}"> € {{ totalAmount }} </span>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-sm"
            >
              Interval
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <ExpenseTableRowComponent
            v-for="(value, key) in expenses"
            :key="key"
            :expense="value"
            @expenseDeleted="deleteExpense"
            @update="updateExpense"
          />
        </tbody>
      </table>
    </div>
    <div class="flex justify-end bg-transparent mt-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="addExpense"
      >
        Add
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue';
import Expense from '@/models/Expense';
import ExpenseTableRowComponent from './ExpenseTableRowComponent.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Array as () => Expense[],
        required: true
    }
});

const emit = defineEmits(['update']);

const expenses = ref(props.data as Expense[]);

watch(() => props.data, () => {
    expenses.value = props.data;
});

watch(() => props.data, () => {
    expenses.value = props.data;
});

const addExpense = () => {
    expenses.value.push(new Expense(0, 'new', 0, 'MONTHLY'));
}

const deleteExpense = (expenseToDelete: Expense): void => {
    const expenseToDeleteIndex = expenses.value.indexOf(expenseToDelete)
    expenses.value.splice(expenseToDeleteIndex, 1)
}

const updateExpense = (expenseToUpdate: Expense): void => {
    emit('update');
}

const totalAmount = computed((): number => {
    return props.data.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
});

</script>

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
            <!-- <th
              scope="col"
              class="px-6 py-3 text-sm"
            >
              Interval
            </th> -->
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <BudgetTableRowComponent
            v-for="(value, key) in budgets"
            :key="key"
            :budget="(value as Budget)"
            :interval="(props.interval as String)"
            @budgetDeleted="deleteBudget"
            @update="updateBudget"
          />
        </tbody>
      </table>
    </div>
    <div class="flex justify-end bg-transparent mt-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="addBudget"
      >
        Add
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watch } from 'vue';
import Budget from '@/models/Budget';
import BudgetTableRowComponent from './BudgetTableRowComponent.vue';
import Interval from '@/models/Interval';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Array as () => Budget[],
        required: true
    },
    interval: {
        type: String as () => Interval,
        required: true
    }
});

const emit = defineEmits(['update']);

const budgets = ref(props.data as Budget[]);

watch(() => props.data, () => {
    budgets.value = props.data;
});

watch(() => props.data, () => {
    budgets.value = props.data;
});

const addBudget = () => {
    budgets.value.push(new Budget(0, 'new', 0, 'MONTHLY'));
}

const deleteBudget = (budgetToDelete: Budget): void => {
    const budgetToDeleteIndex = budgets.value.indexOf(budgetToDelete)
    budgets.value.splice(budgetToDeleteIndex, 1)
}

const updateBudget = (budgetToUpdate: Budget): void => {
    emit('update');
}

const totalAmount = computed((): number => {
    return props.data.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
});

</script>
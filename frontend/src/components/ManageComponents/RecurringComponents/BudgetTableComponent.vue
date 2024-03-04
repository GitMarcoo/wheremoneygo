<template>
  <div>
    <div class="relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200 ">
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
              Amount <span :class="{'text-green-600': totalAmount > 0, 'text-red-600': totalAmount < 0}"> € {{ totalAmount.toFixed(2) }} </span>
            </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <ErrorComponent
            v-if="props.error"
            class="min-heigth-100"
            :message="props.error"
          />
        </tbody>
        <tbody  v-if="isLoading">
          <BudgetTableRowLoadingComponent  
            v-for="n in 3" :key="n"/>
        </tbody>
        <tbody v-else>
          <BudgetTableRowComponent
            
            v-for="(value, key) in budgets"
            :key="key"
            :budget="(value as Budget)"
            :interval="(props.interval)"
            @budgetDeleted="deleteBudget"
            @update="updateBudget"
          />
        </tbody>
      </table>
    </div>
    <span v-if="budgets.length === 0" class="flex p-2 font-bold justify-center text-gray dark:text-white italic">It's looking a bit empty here...</span>
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
import BudgetTableRowLoadingComponent from './BudgetTableRowLoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

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
        required: false,
        default: null
    },
    isLoading: {
        type: Boolean,
        required: false,
        default: false
    },
    error: {
        type: String,
        required: false,
        default: ''
    },
    isSavings: {
        type: Boolean,
        required: false,
        default: false
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
  if(props.isSavings) {
    budgets.value.push(new Budget(0, 'new', 0, null, undefined, undefined, false, true));
    return;
  }
    budgets.value.push(new Budget(0, 'new', 0, 'MONTHLY', undefined, undefined, true));
}

const deleteBudget = (budgetToDelete: Budget): void => {
    const budgetToDeleteIndex = budgets.value.indexOf(budgetToDelete)
    budgets.value.splice(budgetToDeleteIndex, 1)
}

const updateBudget = (budgetToUpdate: Budget): void => {
    emit('update');
}

const totalAmount = computed((): number => {
    return props.data.reduce((total: number, budget: any) => total + Number(budget.getAmountByInterval(props.interval)), 0);
});

</script>
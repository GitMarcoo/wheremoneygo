<template>
  <div class="block width-800 ml-10 sm:ml-auto mr-10 sm:mr-auto justify-center">
    <div class="mt-5">
      <div class="flex justify-items-start">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          Monthly Incomes
        </h3>
      </div>
      <ExpenseTableComponent
        v-if="incomesHasValues"
        :title="'Incomes'"
        :data="incomes"
        @update="refetch"
      />
    </div>
    <div class="mt-10">
      <div class="flex justify-items-start">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          Monthly Expenses
        </h3>
      </div>
      <ExpenseTableComponent
        v-if="expensesHasValues"
        :title="'Incomes'"
        :data="expenses"
        @update="refetch"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onBeforeMount, ref, computed, inject } from 'vue';
import Expense from '@/models/Expense';
import ExpenseTableComponent from '@/components/ManageComponents/ExpenseTableComponent.vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';

defineComponent({
    components: {
        ExpenseTableComponent
    }
});

const expenseService: RESTAdopterWithFetch<Expense> | undefined = inject('expenseService')
if (!expenseService) {
    throw new Error('No expense service provided');
}

const incomes = ref([] as Expense[]);
const expenses = ref([] as Expense[]);
const incomeResponse  = expenseService.custom('positive', 'GET', null, null);
const loadIncomes = ref(incomeResponse.load)
const expenseResponse = expenseService.custom('negative', 'GET', null, null);
const loadExpenses = ref(expenseResponse.load)

onBeforeMount(() => {
    incomeResponse.load().then((data: any) => {
        incomes.value = incomeResponse.entity.value
    });

    expenseResponse.load().then((data: any) => {
        expenses.value = expenseResponse.entity.value
    });
})

const refetch = () => {
    loadIncomes.value().then((data: any) => {
        incomes.value = incomeResponse.entity.value
    });

    loadExpenses.value().then((data: any) => {
        expenses.value = expenseResponse.entity.value
    });
}

const incomesHasValues = computed(() => incomes.value.length > 0);
const expensesHasValues = computed(() => expenses.value.length > 0);

</script>
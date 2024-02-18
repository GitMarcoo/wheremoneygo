<template>
  <div class="block width-800 ml-10 sm:ml-auto mr-10 sm:mr-auto justify-center">
    <section class="mt-3 flex flex-row justify-center">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white flex w m-auto ml-2 mr-2">
        Show in interval: 
      </h1>
      <IntervalDropDown
        :interval="Interval.MONTHLY"
        @intervalChanged="setTableInterval"
      />
    </section>
    <div class="mt-5">
      <div class="flex justify-items-start">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ currentInterval }} Incomes
        </h3>
      </div>
      <BudgetTableComponent
        :title="'Incomes'"
        :data="(incomes as Budget[])"
        :interval="(currentInterval as Interval)"
        @update="refetch"
        :isLoading="incomesIsPending"
        :error="incomesError"
      />
    </div>
    <div class="mt-10">
      <div class="flex justify-items-start">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ currentInterval }} Expenses
        </h3>
      </div>
      <BudgetTableComponent
        :title="'Incomes'"
        :data="(expenses as Budget[])"
        :interval="(currentInterval as Interval)"
        @update="refetch"
        :isLoading="incomesIsPending"
        :error="incomesError"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onBeforeMount, ref, computed, inject, watchEffect } from 'vue';
import Budget from '@/models/Budget';
import BudgetTableComponent from '@/components/ManageComponents/BudgetTableComponent.vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import IntervalDropDown from '@/components/IntervalDropDown.vue';
import Interval from '@/models/Interval';

defineComponent({
    components: {
        BudgetTableComponent
    }
});

const budgetService: RESTAdopterWithFetch<Budget> | undefined = inject('budgetService')
if (!budgetService) {
    throw new Error('No budget service provided');
}

const incomes = ref<Budget[]>([]);
const expenses = ref<Budget[]>([]);
const incomeResponse  = budgetService.custom('incomes', 'GET', null, null);
const loadIncomes = ref(incomeResponse.load)
const expenseResponse = budgetService.custom('expenses', 'GET', null, null);
const loadExpenses = ref(expenseResponse.load)
const currentInterval = ref<Interval>(Interval.MONTHLY);
const incomesIsPending = ref<boolean>(false)
const expenseIsPending = ref<boolean>(false)
const incomesError = ref<string>('')
const expenseError = ref<string>('')

onBeforeMount(() => {
    watchEffect(() => {
      incomesIsPending.value = incomeResponse.isPending.value
      incomesError.value = incomeResponse.error.value
      expenseIsPending.value = expenseResponse.isPending.value
      expenseError.value = expenseResponse.error.value
    })


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

const setTableInterval = (interval: Interval) => {
    currentInterval.value = interval;
}

const incomesHasValues = computed(() => incomes.value.length > 0);
const expensesHasValues = computed(() => expenses.value.length > 0);

</script>
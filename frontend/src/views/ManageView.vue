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
      <ErrorComponent
        v-if="incomesError"
        class="min-heigth-100"
        :message="incomesError"
      />
      <LoadingComponent
        v-if="incomesIsPending"
        class="min-heigth-100"
      />
      <ExpenseTableComponent
        v-else-if="incomesHasValues"
        :title="'Incomes'"
        :data="incomes"
        :interval="currentInterval"
        @update="refetch"
      />
    </div>
    <div class="mt-10">
      <div class="flex justify-items-start">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ currentInterval }} Expenses
        </h3>
      </div>
      <ErrorComponent
        v-if="expenseError"
        class="min-heigth-100"
        :message="expenseError"
      />
      <LoadingComponent
        v-else-if="expenseIsPending"
        class="min-heigth-100"
      />
      <ExpenseTableComponent
        v-else-if="expensesHasValues"
        :title="'Incomes'"
        :data="expenses"
        :interval="currentInterval"
        @update="refetch"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onBeforeMount, ref, computed, inject, watchEffect } from 'vue';
import Expense from '@/models/Expense';
import ExpenseTableComponent from '@/components/ManageComponents/ExpenseTableComponent.vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import IntervalDropDown from '@/components/IntervalDropDown.vue';
import Interval from '@/models/Interval';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

defineComponent({
    components: {
        ExpenseTableComponent
    }
});

const expenseService: RESTAdopterWithFetch<Expense> | undefined = inject('expenseService')
if (!expenseService) {
    throw new Error('No expense service provided');
}

const incomes = ref<Expense[]>([]);
const expenses = ref<Expense[]>([]);
const incomeResponse  = expenseService.custom('positive', 'GET', null, null);
const loadIncomes = ref(incomeResponse.load)
const expenseResponse = expenseService.custom('negative', 'GET', null, null);
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
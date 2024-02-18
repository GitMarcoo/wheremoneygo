<template>
    <div class=" m-auto justify-center w-full">
        <div class="justify-center text-zinc-900 dark:text-white text-3xl font-bold mt-14">
            <h1>You are currenlty at € .... </h1>
        </div>
        <div class="grid grid-cols-2 justify-center m-auto mt-14"> 
            <HomeCardComponent class="justify-center m-auto text-green-600" :title="'Monthly Incomes'" :content="'€ ' + totalMonthlyIncomesAmount"
            :isLoading="incomesIsPending"/>
            <HomeCardComponent class="justify-center m-auto  text-red-600" :title="'Monthly Expenses'" :content="'€ ' + totalMonthlyExpensesAmount"
            :isLoading="expenseIsPending"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed, inject, watchEffect } from 'vue';
import Budget from '@/models/Budget';
import BudgetTableComponent from '@/components/ManageComponents/BudgetTableComponent.vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import IntervalDropDown from '@/components/IntervalDropDown.vue';
import Interval from '@/models/Interval';
import HomeCardComponent from '@/components/HomeComponents/HomeCardComponent.vue';

const budgetService: RESTAdopterWithFetch<Budget> | undefined = inject('budgetService')
if (!budgetService) {
    throw new Error('No budget service provided');
}

const incomes = ref<Budget[]>([]);
const expenses = ref<Budget[]>([]);
const incomeResponse  = budgetService.custom('incomes', 'GET', null, null);
const expenseResponse = budgetService.custom('expenses', 'GET', null, null);
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

const totalMonthlyIncomesAmount = computed((): number => {
    return incomes.value.reduce((total: number, budget: any) => total + Number(budget.getAmountByInterval(Interval.MONTHLY)), 0);
});

const totalMonthlyExpensesAmount = computed((): number => {
    return expenses.value.reduce((total: number, budget: any) => total + Number(budget.getAmountByInterval(Interval.MONTHLY)), 0);
});
</script>
<template>
    <div class="block width-800 ml-10 sm:ml-auto mr-10 sm:mr-auto justify-center">
        <div class="mt-5">
            <div class="flex justify-items-start">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">Monthly Incomes</h3>
            </div>
            <ExpenseTableComponent v-if="incomesHasValues" :title="'Incomes'" :data="incomes"/>
        </div>
        <div class="mt-10">
            <div class="flex justify-items-start">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white">Monthly Expenses</h3>
            </div>
            <ExpenseTableComponent v-if="expensesHasValues" :title="'Incomes'" :data="expenses"/>
        </div>

    </div>
</template>
<script setup lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from 'vue';
import Expense from '@/models/Expense';
import ExpenseTableComponent from '@/components/ManageComponents/ExpenseTableComponent.vue';

defineComponent({
    components: {
        ExpenseTableComponent
    }
});

const incomes = ref([] as Expense[]);
const expenses = ref([] as Expense[]);

onBeforeMount(() => {
    incomes.value = Expense.getMockIncomes();
    expenses.value = Expense.getMockExpenses();
})

const incomesHasValues = computed(() => incomes.value.length > 0);
const expensesHasValues = computed(() => expenses.value.length > 0);

</script>
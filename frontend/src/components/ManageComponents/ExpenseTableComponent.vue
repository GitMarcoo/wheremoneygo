<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-sm">
                            {{ title }}
                        </th>
                        <th scope="col" class="px-6 py-3 text-sm">
                            Amount <span :class="{'text-green-600': totalAmount > 0, 'text-red-600': totalAmount < 0}"> € {{ totalAmount  }} </span>
                        </th>
                        <th scope="col" class="px-6 py-3 text-sm">
                            Interval
                        </th>
                        <th scope="col  ">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <ExpenseTableRowComponent v-for="(value, key) in expenses" :key="key"
                    @expenseDeleted="deleteExpense" :expense="value"/>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end bg-transparent mt-2">
            <button @click="addExpense" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import Expense from '@/models/Expense';
import ExpenseTableRowComponent from './ExpenseTableRowComponent.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

const expenses = ref(props.data as Expense[]);

const addExpense = () => {
    expenses.value.push(new Expense('new', 0, 'MONTHLY'));
}

const deleteExpense = (expenseToDelete: Expense): void => {
    const expenseToDeleteIndex = expenses.value.indexOf(expenseToDelete)
    expenses.value.splice(expenseToDeleteIndex, 1)
}

const totalAmount = computed((): number => {
    return props.data.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
});

</script>
<template>
    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" class="px-6 py-4">
            <input type="text" class="border-0 bg-transparent font-medium text-gray-900 dark:text-white whitespace-nowrap" :value="props.expense.getName()" :disabled="true">
        </th>
        <td class="px-6 py-4 font-bold" :class="{'text-green-600':  props.expense.getAmount() > 0, 'text-red-600':  props.expense.getAmount() < 0}">
            € <input type="text" class="border-0 bg-transparent text-inherit whitespace-nowrap" :value="props.expense.getAmount()" :disabled="true">
        </td>
        <td class="px-6 py-4 font-bold">
            {{ props.expense.getIntervalName() }}
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option selected>Choose a country</option>
                <option>United States</option>
            </select>
        </td>
     </tr>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import Expense from '@/models/Expense';

const props = defineProps({
    expense: {
        type: Expense,
        required: true
    }
});

</script>
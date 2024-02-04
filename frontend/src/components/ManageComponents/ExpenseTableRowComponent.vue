<template>
    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" class="px-6 ">
            <input type="text" class="border-0 bg-transparent font-medium text-gray-900 dark:text-white whitespace-nowrap" 
            :value="props.expense.getName()" :disabled="inPreviewMode">
        </th>
        <td class="px-6 font-bold flex flex-row m-auto" :class="{'text-green-600':  props.expense.getAmount() > 0, 'text-red-600':  props.expense.getAmount() < 0}">
            <div class="text-center m-auto">
                €
            </div>
            <input type="text" class="border-0 bg-transparent text-inherit whitespace-nowrap  p-0 pl-2 w-20" 
            ref="expenseAmount"
            :value="expense.getAmount()" :disabled="inPreviewMode">
        </td>
        <td class="px-6 font-bold">
            <div v-if="inPreviewMode">
                {{ props.expense.getIntervalName() }}
            </div>
            <select v-else id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option selected>MONTHLY</option>
                <option>United States</option>
            </select>
        </td>
        <td class="flex flex-row flex h-16">
            <div class="h-full m-auto flex">
                <EditButton popovertarget="edit-expense-popover" @click="editRow" v-if="inPreviewMode"/>
                <button v-else @click="saveRow"> Save </button>
            </div>
            <div class="h-full m-auto flex">
                <DeleteButton @click="deleteRow" v-if="inPreviewMode"/>
                <button v-else @click="exitEditRow">Cancel</button>
            </div>
        </td>
     </tr>
     <ExpenseEditPopOver :showPopOver="!inPreviewMode" :expense="props.expense"/>
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import Expense from '@/models/Expense';
import DeleteButton from '@/components/Buttons/DeleteButton.vue';
import EditButton from '../Buttons/EditButton.vue';
import ExpenseEditPopOver from './ExpenseEditPopOver.vue';

const props = defineProps({
    expense: {
        type: Expense,
        required: true
    },
    inPreviewMode: {
        type: Boolean,
        required: false,
        default: true
    }
});

const emtis = defineEmits(['expenseDeleted'])

const expense = ref(props.expense)
const expenseAmount = ref()
const inPreviewMode = ref<boolean>(props.inPreviewMode)


const editRow = (): void => {
    inPreviewMode.value = false
}

const exitEditRow = (): void => {
    inPreviewMode.value = true
}

const saveRow = (): void => {
    inPreviewMode. value = true
    expense.value.amount = expenseAmount.value.value
}

const deleteRow = (): void => {
    emtis('expenseDeleted', expense.value)
}


</script>


<template>
    <div v-if="props.showPopOver" class="z-10 absolute top-0 left-8 flex m-auto justify-center bg-gray-600 rounded p-3 w-full width-500 h-96">
      <form >
        <h1 class="w-full m-auto justify-center flex text-3xl dark:text-white font-bold mb-4">Edit Expense</h1>
        <section class="">
          <div class="m-2">
            <label for="expenseName" class="text-gray-800 font-extrabold text-xl">Name:</label>
            <input id="expenseName" type="text" class="border-0 inputUnderline font-medium bg-transparent rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-1 ml-2" 
                :value="props.expense.getName()">
          </div>
          <div class="font-bold flex flex-row m-auto m-2" :class="{'text-green-600':  props.expense.getAmount() > 0, 'text-red-600':  props.expense.getAmount() < 0}">
            <label for="expenseAmount" class="text-gray-800 font-extrabold text-xl">Amount:</label>
            <span class="text-base ml-3 place-self-center text-inherit">
                €
            </span>
            <input id="expenseAmount" type="text" class="border-0 bg-transparent text-inherit whitespace-nowrap rounded p-0 pl-2 w-40" 
            ref="expenseAmount"
            :value="expense.getAmount()">
          </div>
          <div class="font-bold flex flex-row m-2">
            <label for="expenseInterval" class="ExpensePopOverLabel">Interval:</label>
            <select id="expenseInterval" class="ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-0 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                <option selected>MONTHLY</option>
                <option>United States</option>
            </select>
          </div>
          <div>

          </div>
        </section>
        <section class="absolute bottom-0 left-0 p-3 w-full justify-end m-auto flex">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
            </button>
          <DeleteButton/>
        </section>
      </form>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import Expense from '@/models/Expense';
import DeleteButton from '../Buttons/DeleteButton.vue';

const props = defineProps({
    expense: {
        type: Expense,
        required: true
    },
    showPopOver: {
        type: Boolean,
        required: false,
        default: false
    }
});

</script>
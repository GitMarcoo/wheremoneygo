<template>
  <div
    v-if="props.showPopOver"
    class="z-10 absolute top-0 left-8 flex m-auto justify-center bg-gray-600 rounded p-3 w-full width-500 h-96"
  >
    <form @submit.prevent>
      <h1 class="w-full m-auto justify-center flex text-3xl dark:text-white font-bold mb-4">
        Edit Expense
      </h1>
      <section class="" v-if="expenseCopy">
        <div class="m-2">
          <label
            for="expenseName"
            class="text-gray-800 font-extrabold text-xl"
          >Name:</label>
          <input
            id="expenseName"
            v-model="expenseCopy.name"
            type="text" 
            class="border-0 inputUnderline font-medium bg-transparent rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-1 ml-2"
          >
        </div>
        <div
          class="font-bold flex flex-row m-auto m-2"
          :class="{'text-green-600': expenseCopy.getAmount() > 0, 'text-red-600': expenseCopy.getAmount() < 0}"
        >
          <label
            for="expenseAmount"
            class="text-gray-800 font-extrabold text-xl"
          >Amount:</label>
          <span class="text-base ml-3 place-self-center text-inherit">
            €
          </span>
          <input
            id="expenseAmount"
            ref="expenseAmount"
            v-model="expenseCopy.amount" 
            type="number"
            class="border-0 bg-transparent text-inherit whitespace-nowrap rounded p-0 pl-2 w-40"
          >
        </div>
        <ExpenseIntervalDropDown
          :interval="expenseCopy.timeInterval"
          @intervalChanged="expenseCopy.timeInterval = $event"
        />
      </section>
      <section class="absolute bottom-0 left-0 p-3 w-full justify-end m-auto flex">
        <SaveButton :disabled=" !hasChanged || saveisPending" :isPending="saveisPending" @click="saveClicked" />
        <DeleteButton @click="saveClicked" />
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, inject, computed, watchEffect } from 'vue';
import Expense from '@/models/Expense';
import DeleteButton from '../Buttons/DeleteButton.vue';
import SaveButton from '../Buttons/SaveButton.vue';
import ExpenseIntervalDropDown from '../IntervalDropDown.vue';
import RESTAdaptorWithFetch from '@/services/RESTAdaptorWithFetch';

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

const expenseCopy = ref<Expense>();
try {
    expenseCopy.value = Expense.copyConstructor(props.expense);
} catch (error) {
    console.error(error);
}
const expenseService: RESTAdaptorWithFetch<Expense> | undefined = inject('expenseService');
const saveisPending = ref(false);

if (!expenseService) {
  throw new Error('Expense service not found.');
}

const emits = defineEmits(['update', 'close']);

const saveClicked = async(): Promise<void> => {
    await saveExpense();
    emits('close');
    emits('update');
}

const saveExpense = async (): Promise<void> => {

    const response = expenseService.save(expenseCopy.value);

    watchEffect(() => {
        saveisPending.value = response.isPending.value;
    });

    await response.load();
}

const hasChanged = computed(() => {
    return !props.expense.equals(expenseCopy.value);
});

</script>
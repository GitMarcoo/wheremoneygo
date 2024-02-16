<template>
  <div
    v-if="props.showPopOver"
    class="z-10 absolute top-0 left-8 flex m-auto justify-center bg-gray-100 dark:bg-gray-600 rounded p-3 w-full width-500 h-96 backdrop-blur"
  >
    <form @submit.prevent>
      <h1 class="w-full m-auto justify-center flex text-3xl text-gray-800 dark:text-white font-bold mb-4">
        Edit budget
      </h1>
      <section
        v-if="budgetCopy"
        class=""
      >
        <div class="m-2">
          <label
            for="budgetName"
            class="text-gray-800 font-extrabold text-xl mr-2"
          >Name:</label>
          <input
            id="budgetName"
            v-model="budgetCopy.name"
            type="text" 
            class="border-0 inputUnderline font-medium bg-transparent rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-1 ml-2"
          >
        </div>
        <div
          class="font-bold flex flex-row m-auto m-2"
          :class="{'text-green-600': budgetCopy.getAmount() > 0, 'text-red-600': budgetCopy.getAmount() < 0}"
        >
          <label
            for="budgetAmount"
            class="text-gray-800 font-extrabold text-xl mr-2"
          >Amount:</label>
          <span class="text-base ml-3 place-self-center text-inherit">
            €
          </span>
          <input
            id="budgetAmount"
            ref="budgetAmount"
            v-model="budgetCopy.amount" 
            type="number"
            class="border-0 bg-transparent text-inherit whitespace-nowrap rounded p-0 pl-2 w-40"
          >
        </div>
        <IntervalDropDown
          :interval="budgetCopy.timeInterval"
          @intervalChanged="budgetCopy.timeInterval = $event"
        />
        <div class="flex items-center mb-4">
            <input v-model="budgetCopy.recurring" :value="budgetCopy.recurring" id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recurring</label>
        </div>
      </section>
      <section class="absolute bottom-0 left-0 p-3 w-full justify-end m-auto flex gap-2">
        <SaveButton
          :disabled=" !hasChanged || saveIsPending"
          :is-pending="saveIsPending"
          @click="saveClicked"
        />
        <DeleteButtonText
          :disabled="saveIsPending || deleteIsPending"
          :is-pending="deleteIsPending"
          @click="deleteBudget"
        />
        <CustomTextButton
          :disabled="saveIsPending || deleteIsPending"
          button-text="Close"
          @click="emits('close')"
        />
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, inject, computed, watchEffect } from 'vue';
import Budget from '@/models/Budget';
import DeleteButtonText from '../Buttons/DeleteButtonText.vue';
import SaveButton from '../Buttons/SaveButton.vue';
import IntervalDropDown from '../IntervalDropDown.vue';
import RESTAdaptorWithFetch from '@/services/RESTAdaptorWithFetch';
import CustomTextButton from '../Buttons/CustomTextButton.vue';

const props = defineProps({
    budget: {
        type: Budget,
        required: true
    },
    showPopOver: {
        type: Boolean,
        required: false,
        default: false
    }
});

const budgetCopy = ref<Budget>();
try {
    budgetCopy.value = Budget.copyConstructor(props.budget);
} catch (error) {
    console.error(error);
}

watchEffect(() => {
  budgetCopy.value = Budget.copyConstructor(props.budget)
})

if(!budgetCopy.value) {
    budgetCopy.value = new Budget(0, '', 0, '');
}

const budgetService: RESTAdaptorWithFetch<Budget> | undefined = inject('budgetService');

const saveIsPending = ref(false);
const deleteIsPending = ref(false);

if (!budgetService) {
  throw new Error('budget service not found.');
}

const emits = defineEmits(['update', 'close']);

const saveClicked = async(): Promise<void> => {
    await saveBudget();
    emits('close');
    emits('update');
}

const saveBudget = async (): Promise<void> => {

    const response = budgetService.save(budgetCopy.value);

    watchEffect(() => {
        saveIsPending.value = response.isPending.value;
    });

    await response.load();
}

const deleteBudget = async (): Promise<void> => {

    const response = budgetService.deleteById(budgetCopy.value.id)

    watchEffect(() => {
        deleteIsPending.value = response.isPending.value;
    });

    await response.load();
    emits('close');
    emits('update');
}

const hasChanged = computed(() => {
    return !props.budget.equals(budgetCopy.value);
});

</script>@/models/Budget
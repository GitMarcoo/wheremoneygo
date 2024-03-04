<template>
  <dialog
    ref="dialog"
    class="bg-gray-100 dark:bg-gray-900 rounded p-3 open:flex justify-center m-auto w-full width-500"
  >
    <form @submit.prevent >
      <h1 class="w-full m-auto justify-center flex text-3xl text-gray-800 dark:text-white font-bold mb-4">
        Edit budget
      </h1>
      <section
        v-if="budgetCopy"
        class="max-w-md flex flex-col mx-auto h-96"
      >
        <div class="relative w-full mb-5 ">
          <label
            for="budgetName"
            class="text-gray-800 dark:text-white font-bold text-xl mr-2 grid-cols-6"
          >Name:</label>
          <input
            id="budgetName"
            v-model="budgetCopy.name"
            type="text" 
            class="border-0 inputUnderline font-medium focus:ring-0  dark:bg-gray-800 rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-2 ml-2"
          >
        </div>
        <div
          class="relative w-full mb-5 text-gray-500"
          :class="{'text-green-600': budgetCopy.getAmount() > 0, 'text-red-600': budgetCopy.getAmount() < 0}"
        >
          <label
            for="budgetAmount"
            class="text-gray-800 dark:text-white font-bold text-xl mr-2"
          >Amount:</label>
          <span class="text-base ml-3 place-self-center text-inherit font-bold">
            €
          </span>
          <input
            id="budgetAmount"
            ref="budgetAmount"
            v-model="budgetCopy.amount" 
            type="number"
            class="border-0 inputUnderline font-medium focus:ring-0  dark:bg-gray-800 rounded whitespace-nowrap p-0 pl-2 ml-2"
            :class="{'text-green-600': budgetCopy.getAmount() > 0, 'text-red-600': budgetCopy.getAmount() < 0}"
          >
        </div>
        <div class="relative w-full mb-5" v-if="budgetCopy.timeInterval !== null">
          <label
            for="budgetInterval"
              class="text-gray-800 dark:text-white font-bold text-xl mr-2"
            >Interval:</label>
          <IntervalDropDown
            id="budgetInterval"
            :interval="budgetCopy.timeInterval"
            @intervalChanged="budgetCopy.timeInterval = $event"
          />
        </div>
        <div class="flex items-center mb-4">
            <input v-model="budgetCopy.savings" id="savingscheckbox" type="checkbox" 
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
            <label for="savingscheckbox" class="ml-3 text-gray-800 dark:text-white font-bold text-lg">Savings</label>
        </div>
        <div class="flex items-center mb-4" v-if="!budgetCopy.savings">
            <input v-model="budgetCopy.recurring" id="default-checkbox" type="checkbox" 
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-checkbox" class="ml-3 text-gray-800 dark:text-white font-bold text-lg">Recurring</label>
        </div>
        <div v-if="budgetCopy.recurring && !budgetCopy.savings" class="flex flex-row justify-between mt-2">
          <div class="flex flex-col">
            <label
            for="budgetName"
            class="text-gray-800 dark:text-white font-bold text-lg mr-2 grid-cols-6"
            >Start:</label>
            <input
              id="budgetName"
              v-model="budgetCopy.start"
              type="date" 
              class="border-0 inputUnderline font-medium focus:ring-0  dark:bg-gray-800 rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-2"
            >
          </div>
          <div class="flex flex-col">
            <label
            for="budgetName"
            class="text-gray-800 dark:text-white font-bold text-lg mr-2 grid-cols-6"
            >End:</label>
            <input
              id="budgetName"
              v-model="budgetCopy.end"
              type="date" 
              class="border-0 inputUnderline font-medium focus:ring-0  dark:bg-gray-800 rounded text-gray-900 dark:text-white whitespace-nowrap p-0 pl-2"
            >
          </div>
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
          @click="toggleDialog"
        />
      </section>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, inject, computed, watchEffect, defineExpose } from 'vue';
import Budget from '@/models/Budget';
import DeleteButtonText from '@/components/Buttons/DeleteButtonText.vue';
import SaveButton from '@/components/Buttons/SaveButton.vue';
import IntervalDropDown from '@/components/IntervalDropDown.vue';
import RESTAdaptorWithFetch from '@/services/RESTAdaptorWithFetch';
import CustomTextButton from '@/components/Buttons/CustomTextButton.vue';
import { Dialog } from '@headlessui/vue';

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
let dialog: HTMLDialogElement;

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
    toggleDialog();
    // emits('close');
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

const toggleDialog = (): void => {
  if (!dialog.open) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}

defineExpose({
        toggleDialog
    });

const hasChanged = computed(() => {
    return !props.budget.equals(budgetCopy.value);
});

</script>@/models/Budget
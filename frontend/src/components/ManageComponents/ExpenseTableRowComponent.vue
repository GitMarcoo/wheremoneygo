<template>
  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <th
      scope="row"
      class="px-6 "
    >
      <input
        type="text"
        class="border-0 bg-transparent font-medium text-gray-900 dark:text-white whitespace-nowrap" 
        :value="props.expense.getName()"
        :disabled="inPreviewMode"
      >
    </th>
    <td
      class="px-6 font-bold flex flex-row m-auto"
      :class="{'text-green-600': props.expense.getAmount() > 0, 'text-red-600': props.expense.getAmount() < 0}"
    >
      <div class="text-center m-auto">
        €
      </div>
      <input
        type="text" 
        class="border-0 bg-transparent text-inherit whitespace-nowrap  p-0 pl-2 w-20"
        :value="expense.getAmount()"
        :disabled="inPreviewMode"
      >
    </td>
    <td class="px-6 font-bold">
        {{ props.expense.getIntervalName() }}
    </td>
    <td class="flex flex-row flex h-16">
      <div class="h-full m-auto flex">
        <EditButton
          v-if="inPreviewMode"
          popovertarget="edit-expense-popover"
          @click="editRow"
        />
        <button
          v-else
          @click="saveRow"
        >
          Save
        </button>
      </div>
      <div class="h-full m-auto flex">
        <DeleteButton
          v-if="inPreviewMode"
          @click="deleteRow"
        />
        <button
          v-else
          @click="exitEditRow"
        >
          Cancel
        </button>
      </div>
    </td>
  </tr>
  <ExpenseEditPopOver
    :show-pop-over="!inPreviewMode"
    :expense="props.expense"
    @close="exitEditRow"
    @update="passUpdate"
  />
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from 'vue';
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

const emtis = defineEmits(['expenseDeleted', 'update'])

const expense = ref(props.expense)

watch(() => props.expense, () => {
    expense.value = props.expense
})

const inPreviewMode = ref<boolean>(props.inPreviewMode)


const editRow = (): void => {
    inPreviewMode.value = false
}

const exitEditRow = (): void => {
    inPreviewMode.value = true
}

const saveRow = (): void => {
    inPreviewMode. value = true
}

const deleteRow = (): void => {
    emtis('expenseDeleted', expense.value)
}

const passUpdate = (): void => {
    emtis('update')
}


</script>


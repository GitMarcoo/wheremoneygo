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
      class="px-6 font-bold m-auto"
      :class="{'text-green-600': props.expense.getAmount() > 0, 'text-red-600': props.expense.getAmount() < 0}"
    >
      {{ '€ ' + expense.getAmountByInterval(props.interval).toFixed(2) }}
    </td>
    <!-- <td class="px-6 font-bold">
        {{ props.expense.getIntervalName() }}
    </td> -->
    <td class="flex flex-row flex h-16">
      <EditButton
        @click="editRow"
      />
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
import EditButton from '../Buttons/EditButton.vue';
import ExpenseEditPopOver from './ExpenseEditPopOver.vue';
import Interval from '@/models/Interval';

const props = defineProps({
    expense: {
        type: Expense,
        required: true
    },
    inPreviewMode: {
        type: Boolean,
        required: false,
        default: true
    },
    interval: {
        type: Object as () => Interval,
        required: false
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

const passUpdate = (): void => {
    emtis('update')
}


</script>


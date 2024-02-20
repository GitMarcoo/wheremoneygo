<template>
  <tr class="odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700">
    <th
      scope="row"
      class="px-6 "
    >
      <input
        type="text"
        class="border-0 bg-transparent font-medium text-gray-900 dark:text-white whitespace-nowrap" 
        :value="props.budget.getName()"
        :disabled="inPreviewMode"
      >
    </th>
    <td
      class="px-6 font-bold m-auto"
      :class="{'text-green-600': props.budget.getAmount() > 0, 'text-red-600': props.budget.getAmount() < 0}"
    >
      {{ '€ ' + budget.getAmountByInterval(props.interval).toFixed(2) }}
    </td>
    <!-- <td class="px-6 font-bold">
        {{ props.budget.getIntervalName() }}
    </td> -->
    <td class="flex flex-row flex h-16">
      <EditButton
        @click="popOver.toggleDialog()"
      />
    </td>
  </tr>
  <BudgetEditPopOver
    :show-pop-over="!inPreviewMode"
    :budget="props.budget"
    @close="exitEditRow"
    @update="passUpdate"
    ref="popOver"
  />
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits, watch } from 'vue';
import Budget from '@/models/Budget';
import EditButton from '../Buttons/EditButton.vue';
import BudgetEditPopOver from './BudgetEditPopOver.vue';
import Interval from '@/models/Interval';

const props = defineProps({
    budget: {
        type: Budget,
        required: true
    },
    inPreviewMode: {
        type: Boolean,
        required: false,
        default: true
    },
    interval: {
        type: String as () => Interval,
        required: false
    }
});

const emtis = defineEmits(['budgetDeleted', 'update'])
let popOver: any;

const budget = ref(props.budget)

watch(() => props.budget, () => {
    budget.value = props.budget
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
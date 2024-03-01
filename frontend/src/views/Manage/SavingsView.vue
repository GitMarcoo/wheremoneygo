<template>
    <div class="block width-800 ml-10 sm:ml-auto mr-10 sm:mr-auto justify-center">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white text-center mt-5">Savings Overview</h1>
        <div class="mt-5">
            <div class="flex justify-items-start">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">
            Savings
            </h3>
            </div>
            <BudgetTableComponent
            :title="'Savings'"
            :data="(savings as Budget[])"
            @update="refetch"
            :isLoading="savingsIsPending"
            :error="savingsError"
            :isSavings="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import BudgetTableComponent from '@/components/ManageComponents/RecurringComponents/BudgetTableComponent.vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import Budget from '@/models/Budget';
import { ref, onBeforeMount, watchEffect, inject } from 'vue';

const budgetService: RESTAdopterWithFetch<Budget> | undefined = inject('budgetService')
  if (!budgetService) {
      throw new Error('No budget service provided');
  }
  
  const savings = ref<Budget[]>([]);
  const savingsResponse  = budgetService.custom('savings', 'GET', null, null);
  const loadSavings = ref(savingsResponse.load)
  const savingsIsPending = ref<boolean>(false)
  const savingsError = ref<string>('')
  
  onBeforeMount(() => {
      watchEffect(() => {
        savingsIsPending.value = savingsResponse.isPending.value
        savingsError.value = savingsResponse.error.value
      })
  
  
      savingsResponse.load().then((data: any) => {
        savings.value = savingsResponse.entity.value
      });
  })
  
  const refetch = () => {
    loadSavings.value().then((data: any) => {
        savings.value = savingsResponse.entity.value
      });
  }

</script>
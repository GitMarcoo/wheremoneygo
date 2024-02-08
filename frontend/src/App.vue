<template>
  <div class="bg-white dark:bg-gray-800 vh-100">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent, provide } from 'vue'
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import CONFIG from '@/app-config';
import Expense from '@/models/Expense';

defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
})

provide('expenseService', new RESTAdopterWithFetch<Expense>(CONFIG.BACKEND_URL + '/expenses', Expense.copyConstructor))


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vh-100 {
  min-height: 100vh;
}
</style>

<template>
  <div class="bg-white dark:bg-gray-800">
    <NavBar />
    <router-view  class="vh-content pb-5"/>
    <FooterComponent/>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent, provide, shallowReactive } from 'vue'
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import CONFIG from '@/app-config';
import Budget from '@/models/Budget';
import User from './models/User';
import SessionSbService from './services/SessionSbService';
import { FetchInterceptor } from './services/FetchInterceptor';
import { useRouter } from 'vue-router';
import FooterComponent from '@/components/FooterComponent.vue';

defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
})

const router = useRouter()

const sessionService = shallowReactive(new SessionSbService(CONFIG.BACKEND_URL + '/api/v1', 'Authorization'));
const fetchInterceptor = new FetchInterceptor(sessionService, router);

provide('budgetService', new RESTAdopterWithFetch<Budget>(CONFIG.BACKEND_URL + '/api/v1/budgets', Budget.copyConstructor))
provide('userService', new RESTAdopterWithFetch<User>(CONFIG.BACKEND_URL + '/api/v1/users', User.copyConstructor))
provide('authenticationService', new RESTAdopterWithFetch<User>(CONFIG.BACKEND_URL + '/api/v1', User.copyConstructor))
provide('sessionService', sessionService)
provide('fetchInterceptor', fetchInterceptor)


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

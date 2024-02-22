<template>
  <div class="container flex flex-col mt-10 m-auto ">
    <h1 class="text-gray-800 dark:text-white text-3xl">Did you ever wonder <b class="text-gray-800 dark:text-gray-300 m-0">where does my money go?</b></h1>
    <p class="text-gray-700 dark:text-gray-500 text-xl mt-2">This app will help you with that</p>
    <router-link to="/sign-up" class=" mt-10">
                <button class="rounded-xl bg-transparant border-2 border-white text-white hover:bg-white pt-2 pb-2 pl-3 pe-3 font-bold hover:text-gray-800">
                  Sign up now!
                </button>
    </router-link>
  </div>
  
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import HomeLoggedIn from '@/components/HomeComponents/HomeLoggedIn.vue';
import SessionSbService from '@/services/SessionSbService';
import User from '@/models/User';

</script>

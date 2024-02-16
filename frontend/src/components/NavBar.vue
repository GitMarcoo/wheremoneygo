<template>
  <div>
    <nav class=" border-gray-200 dark:bg-gray-900">
      <div class="w-full flex flex-wrap items-center px-4 justify-between p-4">
        <a
          href="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> -->
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">WHERE MONEY GO?</span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          id="navbar-default"
          class="hidden w-full md:block md:w-auto"
        >
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li class="self-center">
              <router-link
                to="/"
                class="navItem"
                aria-current="page"
              >
                Home
              </router-link>
            </li>
            <li class="self-center">
              <router-link
                to="/about"
                class="navItem"
              >
                About
              </router-link>
            </li>
            <li class="self-center">
              <router-link
                to="/manage"
                class="navItem "
              >
                Manage
              </router-link>
            </li>
            <li>
              <button
                id="theme-toggle"
                type="button"
                class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                @click="toggleDarkMode"
              >
                <svg
                  v-if="!darkModeManager.inDarkMode.value"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </button>
            </li>
            <li class="self-center items-end">

            </li>
            <li class="self-center items-end">

            </li>
          </ul>
        </div>
        <div class="">
          <div v-if="user === null" class="flex flex-row gap-3 justify-end items-center">
            <router-link to="/sign-up" class="navItem">
                <button class="rounded-xl bg-transparant border-2 border-white text-white hover:bg-white pt-2 pb-2 pl-3 pe-3 font-bold hover:text-gray-800">
                  Sign up
                </button>
              </router-link>
              <router-link to="/sign-in" class="navItem">
                <button class="rounded-xl bg-blue-600 text-white  hover:bg-blue-800  pt-2 pb-2 pl-3 pe-3 font-bold ">
                  Login
                </button>
              </router-link>
            </div>
            <div v-else  class="flex flex-row gap-5 justify-end items-center">
              <p class="text-gray-800 dark:text-white  text">
                Welcome, {{ user?.username }}
              </p>
              <router-link to="/sign-out" class="navItem">
                <button class="rounded-xl bg-transparant border-2 border-white text-white hover:bg-white pt-2 pb-2 pl-3 pe-3 font-bold hover:text-gray-800">
                  Log out
                </button>
              </router-link>
            </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup lang="ts">
import User from '@/models/User';
import SessionSbService from '@/services/SessionSbService';
import { DarkModeManager } from '@/utils/DarkModeManager';
import { ref, inject, watchEffect, onBeforeMount } from 'vue';

const sessionService: SessionSbService = inject('sessionService')!;
const user = ref<User | null>(sessionService.user.value);

onBeforeMount(() => {
  if(sessionService.getUserFromBrowserStorage()) {
    sessionService.user.value = sessionService.getUserFromBrowserStorage()
  }
}),

watchEffect(() => {
    user.value = sessionService.user.value
})

const darkModeManager = new DarkModeManager()

const toggleDarkMode = ():void => darkModeManager.toggleDarkMode()

</script>
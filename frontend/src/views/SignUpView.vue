<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 m-auto h-full lg:py-0 width-500">
      <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Flowbite    
        </a> -->
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label>
              <input
                id="email"
                type="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required="true"
                v-model="email"
              >
            </div>
            <div>
              <label
                for="firstName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Firstname</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Steve"
                required="true"
                v-model="firstName"
              >
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Lastname</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Smith"
                v-model="lastName"
              >
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
                v-model="password"
              >
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="true"
                v-model="confirmPassword"
              >
            </div>
            <!-- <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div> -->
            <span v-show="passwordError" class="mt-1 justify-center flex text-red-600 italic">*Make sure your passwords match</span>
            <span v-show="signUpError" class="mt-1 justify-center flex text-red-600 italic">{{ signUpError }}</span>
            <button @click="signUpHandle" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <router-link
                to="/login"
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import User from '@/models/User';
import { ref, inject, watchEffect, computed } from 'vue';
import RESTAdopterWithFetch from '@/services/RESTAdaptorWithFetch';
import router from '@/router';
import { useToast } from 'vue-toast-notification';

let email: string;
let password: string;
let confirmPassword: string;
let firstName: string;
let lastName: string;

const $toast = useToast()

const passwordError = ref(false);
const authenticationService: RESTAdopterWithFetch<User> | undefined = inject('authenticationService');
if(!authenticationService) throw new Error('authenticationService is not provided')
const signUpError = ref<string>('');
const signUpIsPending = ref<boolean>(false);

const signUpHandle = () => {
  if (requiredFieldsOk.value) {
    passwordError.value = false
    const user = new User(0, firstName, email, lastName, null, password)
    const response = authenticationService.custom('signup', 'POST', user, null)

    watchEffect(() => {
      signUpIsPending.value = response.isPending.value
      signUpError.value = response.error.value
    })

    response.load().then(() => {
      if(!signUpError.value ) {
        $toast.info('Account created successfully')
        router.push('/sign-in')
      }
    })
  } else if (password !== confirmPassword) {
    passwordError.value = true;
  }
}

const requiredFieldsOk = computed(() => {
  return email && password === confirmPassword && password !== undefined && firstName
})

</script>
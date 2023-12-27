<template>
  <div class="bg-white dark:bg-gray-800 vh-100">
    <NavBar />
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { defineComponent } from 'vue'

defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
})

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
  height: 100vh;
}
</style>

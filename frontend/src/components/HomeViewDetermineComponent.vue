<template>
    <HomeLoggedIn v-if="user" />
    <HomeView v-else />
</template>
<script setup lang="ts">
import User from '@/models/User';
import SessionSbService from '@/services/SessionSbService';
import { inject, ref } from 'vue';
import HomeLoggedIn from './HomeComponents/HomeLoggedIn.vue';
import HomeView from '@/views/HomeView.vue'

const sessionService: SessionSbService = inject('sessionService')!;
const user = ref<User | null>(sessionService.user.value);

</script>
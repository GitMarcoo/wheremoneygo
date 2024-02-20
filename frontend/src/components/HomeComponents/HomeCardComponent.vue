<template>
    <div class="max-w-sm p-6 bg-white rounded-lg shadow dark:bg-gray-900">
        <h2>
            <h5 class="mb-2 text-2xl font-bold tracking-tight "> {{ props.title }}</h5>
        </h2>
        <div v-if="isLoading" class="h-3 bg-gray-200 rounded-full dark:bg-gray-600 max-w-md mb-2.5 animate-pulse"></div>
        <p v-else class="mb-3 font-bold text-xl"> {{ props.content }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: false,
        default: false
    }
})

</script>
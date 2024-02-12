<template>
    <div class="text-red-600 p-2">
        {{ props.message  }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    message: {
        type: String,
        required: true
    }
})

</script>
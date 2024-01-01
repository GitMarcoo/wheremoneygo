<template>
    <div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-sm">
                            {{ title }}
                        </th>
                        <th scope="col" class="px-6 py-3 text-sm">
                            Amount <span :class="{'text-green-600': totalAmount > 0, 'text-red-600': totalAmount < 0}"> € {{ totalAmount  }} </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, key) in data" :key="key" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ value.name }}
                        </th>
                        <td class="px-6 py-4 font-bold" :class="{'text-green-600': value.amount > 0, 'text-red-600': value.amount < 0}">
                            € {{ value.amount }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-end bg-transparent mt-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
});

const totalAmount = computed(() => {
    return props.data.reduce((acc, curr) => acc + curr.amount, 0);
});

</script>
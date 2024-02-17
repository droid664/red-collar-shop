<template>
    <div @click="$emit('click')" class="overlay" :class="className"></div>
</template>

<script setup>
const emits = defineEmits(['click'])
const { className } = defineProps({
    className: {
        type: String,
        default: '',
    },
})
</script>

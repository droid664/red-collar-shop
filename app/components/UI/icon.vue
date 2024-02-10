<template>
    <svg :class="className">
        <use :xlink:href="'#' + id"></use>
    </svg>
</template>

<script setup>
const { id, className } = defineProps({
    id: {
        type: String,
        default: '',
        required: true,
    },
    className: {
        type: String,
        default: '',
        required: false,
    },
})
</script>

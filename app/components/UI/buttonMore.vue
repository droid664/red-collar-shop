<template>
    <div class="button-more">
        <button @click="$emit('click')" class="button" type="button">Load more</button>
    </div>
</template>

<script setup>
const emits = defineEmits(['click'])
</script>

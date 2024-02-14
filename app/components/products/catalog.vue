<template>
    <div class="catalog">
        <ProductsCard v-for="item of data" :key="item.id" :data="item" />
    </div>
</template>

<script setup>
const { data } = defineProps({
    data: {
        type: Array,
        required: true,
    },
})

const loading = ref(true)

loading.value = false
</script>

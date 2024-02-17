<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
const basketStore = useBasket()

basketStore.$subscribe(() => {
    basketStore.saveToLocalStorage()
})

onMounted(() => {
    basketStore.getLocalStorage()
})
</script>

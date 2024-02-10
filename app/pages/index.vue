<template>
    <div class="index-page">
        <Header>
            <template #left>
                <Search />
            </template>
            <template #center>
                <Filters v-if="productsStore.categories.length" :data="productsStore.categories" />
            </template>
        </Header>
    </div>
</template>

<script setup>
const productsStore = useProducts()

await productsStore.fetchGetProducts()
</script>

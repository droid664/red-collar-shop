<template>
    <div class="index-page">
        <Header>
            <template #left>
                <Search />
            </template>
            <template #center>
                <Filters v-if="productsStore.categories.length" :data="productsStore.categories" />
            </template>
            <template #right>
                <BasketButton />
            </template>
        </Header>

        <ProductsCatalog :data="productsStore.products.products" />
    </div>
</template>

<script setup>
const productsStore = useProducts()

await productsStore.fetchGetCategories()
await productsStore.fetchGetProducts({
    limit: 10,
    skip: 0,
})
</script>

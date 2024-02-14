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

        <ProductsCatalog
            :data="productsStore.products.products"
            :loading="loading"
            :action="loadMore"
        />
    </div>
</template>

<script setup>
const loading = ref(false)
const limit = ref(10)
const skip = ref(0)
const productsStore = useProducts()

await productsStore.fetchGetCategories()

const loadProducts = async () => {
    loading.value = true

    await productsStore.fetchGetProducts({
        limit: limit.value,
        skip: skip.value,
    })

    loading.value = false
}

loadProducts()

const loadMore = async () => {
    if (!loading.value && productsStore.products.products.length < productsStore.products.total) {
        skip.value += 10

        await loadProducts()
    }
}
</script>

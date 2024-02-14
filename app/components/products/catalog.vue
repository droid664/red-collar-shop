<template>
    <div class="catalog">
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
    </div>
</template>

<script setup>
const loading = ref(true)
const productsStore = useProducts()

await productsStore.fetchGetProducts({
    limit: 10,
    skip: 0,
})

loading.value = false
</script>

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
const route = useRoute()
const router = useRouter()
const productsStore = useProducts()

let category = route.query?.category

await productsStore.fetchGetCategories()

const loadProducts = async () => {
    loading.value = true

    const payload = {
        limit: limit.value,
        skip: skip.value,
    }

    if (category) {
        payload.category = category
    }

    await productsStore.fetchGetProducts(payload)

    loading.value = false
}

loadProducts()

const loadMore = async () => {
    if (!loading.value && productsStore.products.products.length < productsStore.products.total) {
        skip.value += 10

        await loadProducts()
    }
}

watch(
    () => router,
    async () => {
        category = route.query?.category
        skip.value = 0

        await loadProducts()
    },
    {
        deep: true,
    },
)
</script>

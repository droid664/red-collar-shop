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

        <UICounter @update="handleUpdate" :value="Number(test)" />

        <ProductsCatalog
            v-if="productsStore.products"
            :data="productsStore.products.products"
            :loading="loading"
            :action="loadMore"
        />
        <UIButtonMore v-if="productsStore.error" @click="loadProducts" />
    </div>
</template>

<script setup>
const test = ref(1)
const loading = ref(false)
const limit = ref(10)
const skip = ref(0)
const route = useRoute()
const router = useRouter()
const productsStore = useProducts()

const handleUpdate = (val) => {
    test.value = val
}

let category = route.query?.category
let q = route.query?.q

await productsStore.fetchGetCategories()

const loadProducts = async () => {
    const payload = {
        limit: limit.value,
        skip: skip.value,
    }

    if (category) {
        payload.category = category
    }

    if (q) {
        payload.q = q
    }

    await productsStore.fetchGetProducts(payload)
}

loadProducts()

const loadMore = async () => {
    if (!loading.value && productsStore.products.products.length < productsStore.products.total) {
        loading.value = true
        skip.value += 10

        await loadProducts()

        loading.value = false
    }
}

watch(
    () => router,
    async () => {
        category = route.query?.category
        q = route.query?.q
        skip.value = 0

        await loadProducts()
    },
    {
        deep: true,
    },
)
</script>

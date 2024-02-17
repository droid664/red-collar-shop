<template>
    <div ref="$catalog" class="catalog">
        <div v-for="item of data" :key="item.id" class="catalog__item">
            <ProductsCard :data="item" />
        </div>
        <div class="catalog__decor-grid">
            <div class="catalog__decor-grid-item"></div>
            <div class="catalog__decor-grid-item"></div>
            <div class="catalog__decor-grid-item"></div>
            <div class="catalog__decor-grid-item"></div>
        </div>
    </div>
    <UILoader v-if="loading" />
    <p v-if="!loading && data && !data.length">Ничего не найдено, попробуйте изменить запрос</p>
</template>

<script setup>
const infiniteScroll = ref(undefined)

const { data, loading, action } = defineProps({
    data: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    action: {
        type: Function,
        required: false,
    },
})

const $catalog = ref(null)

onMounted(() => {
    infiniteScroll.value = useInfiniteScroll($catalog.value, async () => {
        if (!action) {
            return
        }

        await action()
    })
})
onBeforeUnmount(() => {
    if (infiniteScroll.value) {
        infiniteScroll.value.unsubscribe()
    }
})
</script>

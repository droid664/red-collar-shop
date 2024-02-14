<template>
    <div ref="$catalog" class="catalog">
        <ProductsCard v-for="item of data" :key="item.id" :data="item" />
    </div>
    <UILoader v-if="loading" />
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

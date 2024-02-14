<template>
    <div v-if="productsStore.categories && productsStore.categories.length" class="filters">
        <Swiper :modules="[SwiperFreeMode]" :free-mode="true" :slides-per-view="'auto'">
            <SwiperSlide v-for="item of productsStore.categories" :key="item">
                <label class="filters__item">
                    <input
                        v-model="selected"
                        class="filters__input"
                        type="radio"
                        name="filter-radio-button"
                        :value="item"
                        @change="item !== 'all' ? handleChange(item) : removeCategory()"
                    />
                    <span class="filters__custom font-m">{{ item }}</span>
                </label>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
const productsStore = useProducts()
const router = useRouter()
const route = useRoute()
const selected = ref('all')

await productsStore.fetchGetCategories()

const handleChange = (value) => {
    router.push({
        query: {
            category: value,
        },
    })
}

const removeCategory = () => {
    router.push({
        query: {},
    })
}

onMounted(() => {
    if (route.query.category) {
        selected.value = route.query.category
    }
})
</script>

<style lang="scss">
.swiper-slide {
    width: initial;
}
</style>

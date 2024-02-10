<template>
    <div v-if="productsStore.categories && productsStore.categories.length" class="filters">
        <Swiper :modules="[SwiperFreeMode]" :free-mode="true" :slides-per-view="'auto'">
            <SwiperSlide v-for="item of productsStore.categories" :key="item">
                <label class="filters__item">
                    <input
                        class="filters__input"
                        type="radio"
                        name="filter-radio-button"
                        :value="item"
                        @change="handleChange(item)"
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

await productsStore.fetchGetProducts()

const handleChange = (value) => {
    router.push({
        query: {
            category: value,
        },
    })
}
</script>

<style lang="scss">
.swiper-slide {
    width: initial;
}
</style>

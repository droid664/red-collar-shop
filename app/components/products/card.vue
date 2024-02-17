<template>
    <div class="card" :class="descriptionShow ? 'card--description' : ''">
        <div class="card__top" v-if="!descriptionShow">
            <span v-if="data.discountPercentage" class="card__sale font-s">
                <b class="card__sale-value">{{ data.discountPercentage }}%</b> off sale
            </span>
            <div
                v-if="data.images && Array.isArray(data.images) && data.images.length"
                class="card__image"
            >
                <Swiper :modules="[SwiperPagination]" :pagination="pagination">
                    <SwiperSlide v-for="(item, i) of data.images" :key="i">
                        <div class="card__image-wrap">
                            <img :src="item" :alt="data.title" loading="lazy" fetchpriority="low" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="card__info">
            <span v-if="data.rating" class="card__rating font-s">
                <UIIcon id="icon-star" className="card__rating-icon" />
                {{ data.rating }}
            </span>
            <span v-if="data.title" class="card__title font-s">{{ data.title }}</span>
            <div v-if="data.description" class="card__desc font-xs">
                <span class="card__desc-text">
                    {{ data.description }}
                </span>
                <button
                    @click="descriptionShow = !descriptionShow"
                    type="button"
                    class="card__desc-button"
                >
                    {{ !descriptionShow ? 'Read more' : 'Hide description' }}
                </button>
            </div>
        </div>
        <div class="card__price">
            <ClientOnly>
                <button
                    v-if="price"
                    @click="addToBasket(item)"
                    class="card__add font-s"
                    type="button"
                >
                    <UIIcon id="icon-basket" className="card__add-icon" />
                    {{ formatPrice(price) }}
                </button>
            </ClientOnly>
            <span class="card__price-old font-s" type="button">{{ formatPrice(data.price) }}</span>
        </div>
    </div>
</template>

<script setup>
import { formatPrice } from '~/helpers/formatPrice.js'

const basketStore = useBasket()

const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const price = ref(0)
const descriptionShow = ref(false)

const addToBasket = () => {
    const { id, title, thumbnail } = data

    basketStore.addProduct({
        id,
        title,
        thumbnail,
        count: 1,
        price: price.value,
    })
}

const calcPrice = () => {
    const discount = data.discountPercentage
    const fullPrice = data.price

    price.value = (fullPrice * (1 - discount / 100)).toFixed(2)
}

// Swiper config
const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>'
    },
}

onBeforeMount(() => {
    calcPrice()
})
</script>

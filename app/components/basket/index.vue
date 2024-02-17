<template>
    <div @keydown.esc="closeBasket" class="basket" :class="UI.isBasketShow ? 'basket--show' : ''">
        <div class="basket__inner">
            <header class="basket__header">
                <h2 class="basket__title">
                    <UIIcon id="icon-basket" className="basket__icon" />
                    cart
                </h2>
                <button @click="closeBasket" class="button-close"></button>
            </header>
            <div class="basket__content">
                <ul v-if="IS_EMPTY" class="basket__list">
                    <li class="basket__item" v-for="p of products" :key="p.id">
                        <div class="basket__image small-image">
                            <img
                                class="basket__image"
                                :src="p.thumbnail"
                                :alt="p.title"
                                loading="lazy"
                                fetchpriority="low"
                            />
                        </div>
                        <div class="basket__item-wrap">
                            <div class="basket__info">
                                <h3 class="basket__item-title font-s">{{ p.title }}</h3>
                                <span class="basket__item-price font-s">{{
                                    formatPrice(p.price)
                                }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-else class="basket__empty">cart is empty :(</p>
            </div>
            <footer class="basket__footer">
                <template v-if="IS_EMPTY">
                    <span class="basket__positions">{{ products.length }} positions</span>
                    <span class="basket__sum">$2196</span>
                </template>
                <button
                    @click="!IS_EMPTY ? closeBasket() : () => {}"
                    class="basket__button"
                    type="button"
                >
                    {{ IS_EMPTY ? 'place an order' : 'back to products' }}
                </button>
            </footer>
        </div>
        <UIOverlay @click="closeBasket" className="basket__overlay" />
    </div>
</template>

<script setup>
import { formatPrice } from '~/helpers/formatPrice'

const UI = useUI()
const basketStore = useBasket()
const { products } = storeToRefs(basketStore)

const closeBasket = () => {
    UI.$patch({
        isBasketShow: false,
    })
}

const handleWindowKeyUp = ({ code }) => {
    if (code === 'Escape') {
        closeBasket()
    }
}

const IS_EMPTY = computed(() => {
    return Boolean(products.value.length)
})

onMounted(() => {
    window.addEventListener('keyup', handleWindowKeyUp)
})

onUnmounted(() => {
    window.removeEventListener('keyup', handleWindowKeyUp)
})
</script>

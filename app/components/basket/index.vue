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
                    <BasketItem v-for="p of products" :data="p" :key="p.id" />
                </ul>
                <p v-else class="basket__empty">cart is empty :(</p>
            </div>
            <footer class="basket__footer">
                <template v-if="IS_EMPTY">
                    <span class="basket__positions">{{ products.length }} positions</span>
                    <span class="basket__sum">{{ formatPrice(BASKET_SUM) }}</span>
                </template>
                <button
                    @click="!IS_EMPTY ? closeBasket() : submitOrder()"
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

const BASKET_SUM = computed(() => {
    if (!products.value.length) return 0

    return products.value
        .map((p) => +p.price * +p.count)
        .reduce((acc, current) => {
            return (acc += current)
        })
})

const submitOrder = () => {
    alert(`An order for ${formatPrice(BASKET_SUM.value)} has been placed!`)
    basketStore.clear()
}

onMounted(() => {
    window.addEventListener('keyup', handleWindowKeyUp)
})

onUnmounted(() => {
    window.removeEventListener('keyup', handleWindowKeyUp)
})
</script>

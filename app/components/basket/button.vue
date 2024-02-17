<template>
    <button
        @click="handleClick"
        class="button-basket font-m"
        :class="products.length ? 'button-basket--not-empty' : ''"
        type="button"
    >
        <UIIcon class="button-basket__icon" id="icon-basket"></UIIcon>
        cart
        <span v-if="products.length" class="button-basket__count font-s">{{
            products.length
        }}</span>
    </button>
</template>

<script setup>
const basketStore = useBasket()
const UI = useUI()
const { products } = storeToRefs(basketStore)

const handleClick = () => {
    basketStore.getLocalStorage()

    UI.$patch({
        isBasketShow: true,
    })
}
</script>

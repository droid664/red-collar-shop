<template>
    <button @click="handleClick" class="button-basket font-m" type="button">
        <UIIcon class="button-basket__icon" id="icon-basket"></UIIcon>
        cart
    </button>
</template>

<script setup>
const UI = useUI()

const handleClick = () => {
    UI.$patch({
        isBasketShow: true,
    })
}
</script>

<template>
    <div class="search" :class="show ? 'search--show' : ''">
        <button @click="show = true" class="search__button" type="button">
            <UIIcon className="search__icon" id="icon-search"></UIIcon>
        </button>
        <div class="search__field">
            <input class="search__input font-m" type="text" placeholder="Search..." />
        </div>
        <button class="search__clear" type="button"></button>
    </div>
</template>

<script setup>
const show = ref(false)

const hide = () => {
    show.value = false
}
</script>

<template>
    <li v-if="data" class="notification__item">
        <div v-if="data.thumbnail" class="notification__image small-image">
            <img :src="data.thumbnail" loading="lazy" fetchpriority="low" />
        </div>
        <div class="notification__info">
            <h3 v-if="data.title" class="notification__info-title font-s">{{ data.title }}</h3>
            <p v-if="data.desc" class="notification__info-desc font-s">{{ data.desc }}</p>
        </div>
    </li>
</template>

<script setup>
const notificationStore = useNotification()
const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

onMounted(() => {
    setTimeout(() => {
        notificationStore.clearItem()
    }, 2000)
})
</script>

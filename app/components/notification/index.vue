<template>
    <div class="notification">
        <ul v-if="list.length" class="notification__list">
            <NotificationItem v-for="item of list" :key="item.id" :data="item" />
        </ul>
    </div>
</template>

<script setup>
const notification = useNotification()
const { list } = storeToRefs(notification)
</script>

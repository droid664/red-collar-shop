import { defineStore } from 'pinia'

export const useUI = defineStore('UI', {
    state: () => ({
        isBasketShow: false,
    }),
})

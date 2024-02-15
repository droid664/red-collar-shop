import { defineStore } from 'pinia'

export const useBasket = defineStore('basket', {
    state: () => {
        return {
            products: [],
        }
    },
    actions: {
        addProduct(product) {
            this.products.push(product)
        },
        removeProduct(id) {
            this.products = this.products.filter((p) => p.id !== id)
        },
        saveToLocalStorage() {
            localStorage.setItem('redCollarShopBasket', JSON.stringify(this.products))
        },
        getLocalStorage() {
            this.products = localStorage.getItem('redCollarShopBasket')
        },
    },
})

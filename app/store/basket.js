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
        updateCount(id, newCount) {
            this.products = this.products.map((item) => {
                if (item.id === id) {
                    item.count = newCount
                }

                return item
            })
        },
        saveToLocalStorage() {
            try {
                localStorage.setItem('redCollarShopBasket', JSON.stringify(this.products))
            } catch (error) {
                console.error('Local storage error: ' + error)
            }
        },
        getLocalStorage() {
            let data

            try {
                data = JSON.parse(localStorage.getItem('redCollarShopBasket'))
            } catch (error) {
                console.error('Local storage error: ' + error)
            }

            if (!data) return

            this.products = data
        },
        clear() {
            this.products = []
        },
    },
})

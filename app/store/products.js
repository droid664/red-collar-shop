import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
    state: () => {
        const API = useRuntimeConfig().public.API

        return {
            API,
            products: [],
            categories: [],
            loading: false,
            error: null,
        }
    },
    actions: {
        async fetchGetProducts() {
            try {
                const { data, error } = await useFetch(`/products/categories`, {
                    baseURL: this.API,
                })

                if (data.value && Array.isArray(data.value)) {
                    const categories = data.value.slice(0)

                    categories.unshift('all')

                    this.categories = categories
                }

                if (error.value) {
                    console.error('fetchGetProducts error: ', error.value)
                }
            } catch (error) {
                console.log('fetchGetProducts error: ', error)
            }
        },
    },
})

import { defineStore } from 'pinia'
import qs from 'qs'

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
        async fetchGetCategories() {
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
                    console.error('fetchGetCategories error: ', error.value)
                }
            } catch (error) {
                console.log('fetchGetCategories error: ', error)
            }
        },
        async fetchGetProducts(params = {}) {
            let url = '/products'

            // Категории
            if ('category' in params) {
                url += `/category/${params.category}`
            } else if ('searchQuery' in params) {
                url += `/search`
            }

            let query = {}

            // Query
            if ('limit' in params) {
                query.limit = params.limit
            }

            if ('skip' in params) {
                query.skip = params.limit
            }

            if ('searchQuery' in params) {
                query.q = params.searchQuery
            }

            if ('select' in params) {
                query.select = params.select
            }

            query = qs.stringify(query)

            if (Object.keys(query).length) {
                url += `?${query}`
            }

            try {
                const { data, error } = await useFetch(url, {
                    baseURL: this.API,
                })

                if (data.value) {
                    this.products = data.value
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

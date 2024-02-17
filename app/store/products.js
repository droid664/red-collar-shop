import { defineStore } from 'pinia'
import qs from 'qs'

export const useProducts = defineStore('products', {
    state: () => {
        const API = useRuntimeConfig().public.API

        return {
            API,
            products: undefined,
            categories: [],
            products: undefined,
            error: false,
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
            this.error = false

            let url = '/products'

            // Категории и поиск
            if ('category' in params) {
                url += `/category/${params.category}`
            } else if ('q' in params) {
                url += `/search`
            }

            let query = {}

            // Query
            if ('limit' in params) {
                query.limit = params.limit
            }

            if ('skip' in params) {
                query.skip = params.skip
            }

            if ('q' in params) {
                query.q = params.q
            }

            if (Object.keys(query).length) {
                url += `?${qs.stringify(query)}`
            }

            try {
                const { data, error } = await useFetch(url, {
                    baseURL: this.API,
                })

                if (data.value) {
                    this.setProducts(data.value, Boolean(query.skip))
                }

                if (error.value) {
                    console.error('fetchGetProducts error: ', error.value)
                    this.error = true
                    alert('The request failed with an error')
                }
            } catch (error) {
                console.log('fetchGetProducts error: ', error)
                this.error = true
                alert('The request failed with an error')
            }
        },
        setProducts(data, loadMore) {
            if (loadMore) {
                this.products.products.push(...data.products)
            } else {
                this.products = data
            }
        },
    },
})

<template>
    <li ref="$product" class="basket__item" :class="is_delete ? 'basket__item--delete' : ''">
        <div class="basket__image small-image">
            <img
                class="basket__image"
                :src="data.thumbnail"
                :alt="data.title"
                loading="lazy"
                fetchpriority="low"
            />
        </div>
        <div class="basket__item-wrap">
            <div class="basket__info">
                <h3 class="basket__item-title font-s">{{ data.title }}</h3>
                <span class="basket__item-price font-s">{{ formatPrice(data.price) }}</span>
            </div>
        </div>
        <button @click="removeProduct" type="button" class="basket__delete">
            <UIIcon id="icon-trash" className="basket__delete-icon" />
            <span class="basket__delete-text font-s">product has been delete</span>
        </button>
    </li>
</template>

<script setup>
import { formatPrice } from '~/helpers/formatPrice'

const basketStore = useBasket()
const $product = ref(false)
const is_delete = ref(false)

const { data } = defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const removeProduct = () => {
    is_delete.value = true

    if (!data.id) {
        console.error('Basket remove product error: id is not defined')
        return
    }

    $product.value.addEventListener('transitionend', () => {
        basketStore.removeProduct(data.id)
    })
}
</script>

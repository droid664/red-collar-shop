<template>
    <div class="card" :class="descriptionShow ? 'card--description' : ''">
        <div class="card__top" v-if="!descriptionShow">
            <span class="card__sale font-s"> <b class="card__sale-value">12.96%</b> off sale </span>
            <div class="card__image">
                <Swiper :modules="[SwiperPagination]" :pagination="pagination">
                    <SwiperSlide>
                        <div class="card__image-wrap">
                            <img src="https://api.ex102.fvds.ru/uploads/1_fe28b65d2c.png" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card__image-wrap">
                            <img src="https://api.ex102.fvds.ru/uploads/1_fe28b65d2c.png" alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="card__image-wrap">
                            <img src="https://api.ex102.fvds.ru/uploads/1_fe28b65d2c.png" alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="card__info">
            <span class="card__rating font-s">
                <UIIcon id="icon-star" className="card__rating-icon" />
                4.69
            </span>
            <span class="card__title font-s">Apple iPhone 9</span>
            <div class="card__desc font-xs">
                <span class="card__desc-text">
                    An apple mobile which is nothing like apple An apple mobile which is nothing
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, laudantium
                    distinctio? Incidunt, et ut explicabo eum nam perspiciatis delectus ad dolore
                    facere nulla amet quos necessitatibus aperiam blanditiis repudiandae excepturi!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam temporibus
                    magni praesentium necessitatibus
                </span>
                <button
                    @click="descriptionShow = !descriptionShow"
                    type="button"
                    class="card__desc-button"
                >
                    {{ !descriptionShow ? 'Read more' : 'Hide description' }}
                </button>
            </div>
        </div>
        <div class="card__price">
            <button class="card__add font-s" type="button">
                <UIIcon id="icon-basket" className="card__add-icon" />
                $459
            </button>
            <span class="card__price-old font-s" type="button">$685</span>
        </div>
    </div>
</template>

<script setup>
const descriptionShow = ref(false)

// Swiper config
const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>'
    },
}
</script>

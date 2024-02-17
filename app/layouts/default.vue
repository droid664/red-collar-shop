<template>
    <div class="default-layout">
        <div class="site">
            <div class="site-top">
                <slot></slot>
            </div>
            <div class="site-bottom">
                <Footer />
            </div>
        </div>

        <Notification />
        <Basket />
        <UISprite />
    </div>
</template>

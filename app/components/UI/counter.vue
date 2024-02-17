<template>
    <div class="counter">
        <button @click="handleDecr" class="counter__decr" type="button"></button>
        <input
            class="counter__value font-xs"
            type="text"
            @input="inputValidate"
            @blur="handleBlur"
            :value="value"
        />
        <button @click="handleInc" class="counter__inc" type="button"></button>
    </div>
</template>

<script setup>
const emits = defineEmits(['update'])
const props = defineProps({
    value: {
        type: Number,
        default: 1,
    },
})

const handleDecr = () => {
    if (props.value - 1 <= 0) {
        return
    } else {
        emits('update', props.value - 1)
    }
}

const handleInc = () => {
    emits('update', props.value + 1)
}

const inputValidate = (event) => {
    const { value: eventValue } = event.target
    const regexp = /[^0-9]/

    if (regexp.test(eventValue)) {
        event.target.value = props.value
    } else {
        emits('update', eventValue)
    }
}

const handleBlur = (event) => {
    const { value } = event.target

    if (!Number(value)) {
        emits('update', 1)
    }
}
</script>

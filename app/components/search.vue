<template>
    <div class="search" :class="show ? 'search--show' : ''">
        <button @click="show = true" class="search__button" type="button">
            <UIIcon className="search__icon" id="icon-search"></UIIcon>
        </button>
        <div class="search__field">
            <input
                ref="$input"
                v-model="searchValue"
                class="search__input font-m"
                type="text"
                placeholder="Search..."
                :tabindex="show ? '0' : '-1'"
                @blur=""
            />
        </div>
        <button @click="clear" class="search__clear" type="button"></button>
    </div>
</template>

<script setup>
import { debounce } from 'vue-debounce'

const $input = ref(null)
const searchValue = ref('')
const route = useRoute()
const router = useRouter()
const show = ref(false)

const handleChange = () => {
    const length = searchValue.value.length
    const query = Object.assign({}, route.query)

    delete query.category

    query.q = searchValue.value

    if (length > 3) {
        router.push({
            query,
        })
    }
}

const dFn = debounce(handleChange, '1000ms')

const hide = () => {
    show.value = false
}

const clear = () => {
    const query = Object.assign({}, route.query)

    delete query.q

    router.push({
        query,
    })

    searchValue.value = ''

    hide()
}

watch(searchValue, () => {
    dFn(true)
})

watch(show, (val) => {
    if (val) {
        $input.value.focus()
    }
})

onMounted(() => {
    if (route.query?.q) {
        searchValue.value = route.query.q
        show.value = true
    }
})
</script>

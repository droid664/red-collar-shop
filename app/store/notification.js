import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useNotification = defineStore('notification', {
    state: () => ({
        list: [],
    }),
    actions: {
        add(payload) {
            const id = nanoid()

            this.list.push({
                id,
                title: payload?.title ?? '',
                desc: payload?.desc ?? '',
                thumbnail: payload?.thumbnail ?? '',
            })
        },
        clearItem() {
            this.list.shift()
        },
    },
})

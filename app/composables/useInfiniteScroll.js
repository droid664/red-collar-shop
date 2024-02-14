export const useInfiniteScroll = ($el, action, distanceBottom = 0) => {
    if (!$el) {
        console.error('UseInfiniteScroll error: $el is not defined')
        return
    }

    const handleScroll = async () => {
        const rect = $el.getBoundingClientRect()
        const dist = Math.floor(rect.bottom - window.innerHeight - distanceBottom)

        if (dist <= 0) {
            await action()
        }
    }

    const unsubscribe = () => {
        window.removeEventListener('scroll', handleScroll)
    }

    window.addEventListener('scroll', handleScroll)

    return { unsubscribe }
}

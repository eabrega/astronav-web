import { ref } from 'vue'

const visible = ref(false)

export function useSidebarVisible() {
    function toggle() {
        visible.value = !visible.value
    }
    return { visible, toggle }
}

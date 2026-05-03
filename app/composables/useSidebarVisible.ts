export function useSidebarVisible() {
    const visible = useState('sidebarVisible', () => false)
    function toggle() {
        visible.value = !visible.value
    }
    return { visible, toggle }
}

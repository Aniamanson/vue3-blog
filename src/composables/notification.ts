import { ref } from 'vue'

const show = ref(false)
const type = ref('is-warning')

export function useNotification() {
  return {
    show,
    type,
    showNotification: () => show.value = true,
    hideNotification: () => show.value = false,
    changeType: (notifyType) => type.value = notifyType
  }
}

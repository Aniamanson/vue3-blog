import { ref, shallowRef } from 'vue'
import SignUpForm from '../components/SignUpForm.vue'
import SignInForm from '../components/SignInForm.vue'
import ConfirmLogout from '../components/ConfirmLogout.vue'
import ConfirmDeletePost from '../components/ConfirmDeletePost.vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: string) => {
      show.value = true
      const html = document.querySelector('html')
      if (html) {
        html.classList.add('fixed')
      }
      switch (type) {
        case 'signIn': return component.value = SignInForm
        case 'signUp': return component.value = SignUpForm
        case 'confirmLogout': return component.value = ConfirmLogout
        case 'confirmDeletePost': return component.value = ConfirmDeletePost
      }
    },
    hideModal: () => {
      show.value = false
      const html = document.querySelector('html')
      if (html) {
        html.classList.remove('fixed')
      }
    },
  }
}

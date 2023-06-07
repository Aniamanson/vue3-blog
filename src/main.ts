import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import './style.scss'
import App from './App.vue'
import { useUsers } from './store/users'
import { usePosts } from './store/posts'

const app = createApp(App)
app.use(createPinia())

const postsStore = usePosts()
const usersStore = useUsers()

Promise.all([
  usersStore.authentication(),
  postsStore.fetchPosts()
]).then(() => {
  app.use(router)
  app.mount('#app')
})

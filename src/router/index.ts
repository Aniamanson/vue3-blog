import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Home from '../views/Home.vue'
import NewPost from '../views/NewPost.vue'
import ShowPost from '../views/ShowPost.vue'
import EditPost from '../views/EditPost.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Posts from '../views/Posts.vue'
import { useUsers } from '../store/users'
import { usePosts } from '../store/posts'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      alias: '/home'
    },
    {
      path: '/posts/new',
      component: NewPost,
      beforeEnter: () => {
        const usersStore = useUsers()
        if (!usersStore.currentUserId) {
          return {
            path: '/'
          }
        }
      }
    },
    {
      path: "/posts",
      component: Posts
    },
    {
      path: "/posts/:id/edit",
      component: EditPost,
      beforeEnter: (to, from) => {
        const usersStore = useUsers()
        const postsStore = usePosts()
        const author = postsStore.all.get(to.params.id as string)
        if (!postsStore.ids.includes(to.params.id as string) || usersStore.currentUserId !== author?.authorID) {
          return {
            path: '/posts'
          }
        }
      }
    },
    {
      path: "/posts/:id",
      component: ShowPost,
      beforeEnter: (to, from) => {
        const postsStore = usePosts()
        if (!postsStore.ids.includes(to.params.id as string)) {
          return {
            path: '/404'
          }
        }
      }
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
      alias: '/404'
    }
  ]
})

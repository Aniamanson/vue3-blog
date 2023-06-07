<script setup lang="ts">
import Loader from '../components/Loader.vue'
import PostEditor from '../components/PostEditor.vue'
import { TimeLinePost, Post } from '../data/posts'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { useUsers } from '../store/users'
import { usePosts } from '../store/posts'
import { useRouter } from 'vue-router'

const usersStore = useUsers()
const postsStore = usePosts()
const router = useRouter()

const post: Post = {
  id: '-1',
  authorID: '',
  title: 'New Post 😻',
  created: new Date().toISOString(),
  markdown: '## Some Title\n```\nfunction loveCats (cat) {\n console.log(cat)\n}\n```\n<a href="https://google.com">&#128073; Awersome link here</a><br><br><img src="https://thumbs.gfycat.com/MarriedCourteousGalapagossealion-size_restricted.gif" style="width:250px">',
  html: '<h2>Title</h2>',
  img: 'https://as1.ftcdn.net/v2/jpg/05/62/83/38/1000_F_562833814_e4ST6Ke3Q3UHGcqIk6uKRKcRU1K9oFiZ.jpg'
}

if (usersStore.currentUserId) {
  post.authorID = usersStore.currentUserId
}

async function submitHandler (post: Post) {
  await postsStore.createPost(post)
  await router.push('/posts')
}
</script>

<template>
  <Breadcrumbs />
  <Suspense>
    <template #default>
      <div>
        <h1>New Post</h1>
        <PostEditor :post="post" @submit="submitHandler" />
      </div>
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
</style>

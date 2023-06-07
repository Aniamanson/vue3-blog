<script setup lang="ts">
import Loader from '../components/Loader.vue'
import PostEditor from '../components/PostEditor.vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../store/posts'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { Post } from '../data/posts'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const postsStore = usePosts()

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  throw Error(`Post with id ${id} was not found`)
}

async function submitHandler (post: Post) {
  await postsStore.updatePost(post)
  await router.push('/')
}
</script>

<template>
  <Breadcrumbs />
  <Suspense>
    <template #default>
      <div>
        <h1>Edit Post</h1>
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

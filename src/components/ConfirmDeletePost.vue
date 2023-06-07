<script setup lang="ts">
import { useModal } from '../composables/modal'
import Confirmation from './Confirmation.vue'
import { useRouter } from 'vue-router'
import { usePosts } from '../store/posts'

const postsStore = usePosts()
const modal = useModal()
const router = useRouter()

async function deletePost () {
  await postsStore.deletePost()
  postsStore.selectedPost = ''
  modal.hideModal()
  router.push({ path: '/'})
}

</script>

<template>
  <Confirmation>
    <template #title>
      Are you sure you want to delete this post?
    </template>
    <template #button>
      <button class="button is-primary" @click.prevent="deletePost" type="submit">Delete Post</button>
    </template>
  </Confirmation>
</template>

<style scoped>
</style>

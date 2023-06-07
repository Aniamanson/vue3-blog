<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { usePosts } from '../store/posts'
import { useUsers } from '../store/users'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import { computed, ref, onBeforeMount } from 'vue'
import { useModal } from '../composables/modal'

const route = useRoute()
const router = useRouter()
const postsStore = usePosts()
const usersStore = useUsers()
const modal = useModal()

let author = ref('')

const id = route.params.id as string
const post = postsStore.all.get(id)

if (!post) {
  router.push('/404')
  throw Error('the post was not found')
}

const canEdit = computed(() => {
  if (!usersStore.currentUserId || !post) {
    return false
  }
  return usersStore.currentUserId === post?.authorID;
});

async function getAuthor () {
  const username = await usersStore.getUser(post?.authorID as string)
  if (username) {
    author.value = username as string
  }
}

getAuthor()

function deletePost () {
  postsStore.selectedPost = post?.id as string
  modal.showModal('confirmDeletePost')
}
</script>

<template>
  <Breadcrumbs />
  <div class="columns">
    <div class="column">
      <aside>
        <div v-if="author" class="author">
          <label class="label">Post Author:&nbsp;</label>
          <span>{{ author }}</span>
        </div>
        <div v-if="canEdit" class="buttons">
          <RouterLink
            :to="`/posts/${post.id}/edit`"
            class="button is-info is-outlined"
          >Edit Post
          </RouterLink>
          <button
            class="button is-danger"
            @click.prevent="deletePost"
          >
            Delete Post
          </button>
        </div>
      </aside>
    </div>
    <div class="column is-four-fifths">
      <h1>{{ post?.title }}</h1>
      <img :src="post?.img" :alt="post?.title" class="img-responsive blog-img">
      <div class="editor-text" v-html="post?.html" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
aside {
  position: sticky;
  top: 2rem;
}
.author {
  margin-bottom: 1rem;
}
.blog-img {
  border-radius: 0.4rem;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 25rem;
}
</style>

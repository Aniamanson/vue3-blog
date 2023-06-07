<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePosts } from '../store/posts'
const postsStore = usePosts()

const route = useRoute()
const routePath = route.path.split('/').slice(1)

function  itemTitle (id: string) {
  const post = postsStore.all.get(id)
  if (post) {
    return post.title
  } else {
    return ''
  }
}
</script>

<template>
  <div class="breadcrumb-wrap">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <template v-for="(item, index) in routePath">
          <li v-if="index === routePath.length - 1" :key="index" class="is-active">
            <span v-if="Number(item)" aria-current="page">{{ itemTitle(item) }}</span>
            <span v-else aria-current="page">{{ item }}</span>
          </li>
          <li v-else :key="index + 2">
            <RouterLink v-if="Number(item)" :to="`/posts/${ item }`">{{ itemTitle(item) }}</RouterLink>
            <RouterLink v-else :to="`/${ item }`">{{ item }}</RouterLink>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.breadcrumb-wrap {
  margin-bottom: 1rem;
  max-width: 100%;
}
.is-active span {
  padding: 0 0.75em;
  max-width: 18rem;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>

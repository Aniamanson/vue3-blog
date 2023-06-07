<script setup lang="ts">
import TimeLineItem from './TimeLineItem.vue'
import { usePosts } from '../store/posts'
import { periods } from '../constants'
import { computed } from 'vue'
import { Post } from '../data/posts'

const postsStore = usePosts()
await postsStore.fetchPosts()

const posts = computed(() => {
  if (postsStore.filteredPosts) {
    return postsStore.filteredPosts as Post[]
  }
})

</script>

<template>
  <nav class="panel is-info">
    <p class="panel-tabs">
      <a
        v-for="(period, index) in periods"
        :key="index"
        :class="{'is-active': postsStore.selectedPeriod === period}"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </p>
    <div v-if="posts">
      <transition-group name="list" tag="div" class="posts__list">
        <TimeLineItem v-for="post in posts" :key="post?.id" :post="post" />
      </transition-group>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
.posts__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 2rem;
  @media (max-width: 500px) {
    padding: 0;
  }
}
</style>

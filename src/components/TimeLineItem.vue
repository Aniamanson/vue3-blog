<script setup lang="ts">
import moment from 'moment'
import { TimeLinePost } from '../data/posts'
import { useUsers } from '../store/users'
import { ref } from 'vue'

const usersStore = useUsers()
const author = ref('')
const props = defineProps<{
  post: TimeLinePost
}>()

async function getAuthor () {
  const username = await usersStore.getUser(props.post.authorID)
  if (username) {
    author.value = username as string
  }
}

getAuthor()
</script>

<template>

  <RouterLink :to="`/posts/${ post.id }`">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="props.post.img" :alt="props.post.title" draggable="false" class="post__img">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ props.post.title }}</p>
            <p class="subtitle is-6"><strong>Author:</strong> {{ author }}</p>
          </div>
        </div>

        <div class="content" v-html="post.html" />
        <!--        <a href="#">#css</a> <a href="#">#responsive</a>-->
        <time>{{ moment(props.post.created).format('LL') }}</time>
      </div>
    </div>
  </RouterLink>

</template>

<style lang="scss" scoped>
.content {
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 1em 2em -0.1em rgba(10, 10, 10, 0.2);
    .post__img  {
      transform: scale(1.1);
    }
  }
}
.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.image {
  width: 100%;
  max-height: 18rem;
  overflow: hidden;
}
.post__img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transition: 0.3s;
}
time {
  display: block;
  margin-top: auto;
}
</style>

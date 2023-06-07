## Vue.js: The Composition API (v3)

This blog has been created using **THIRD** version of awesome Vue framework, that has a lot of improvements:

### Vue.js
- `<script setup>`
- Vite + ES modules
- Vuex -> Pinia (official state management solution)
- Composables
- Reusable components

### General Skills
- Design Patterns, modular code
- TypeScript for type safety
- *real* authentication and authorization using jsonwebtoken (JWT)
- Basic server with Node.js + Express

```html
<script setup lang="ts">
import { TimelinePost } from '../posts'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"> 
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>
```

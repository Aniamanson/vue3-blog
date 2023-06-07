<script setup lang="ts">
import { TimeLinePost, Post } from '../data/posts'
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'
import { useUsers } from '../store/users'

const props = defineProps<{
  post: TimeLinePost | Post
}>()

const emit = defineEmits<{
  (event: 'submit', payload: Post): void
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()
const html = ref('')
const img = ref(props.post.img)

const usersStore = useUsers()

function parseHtml(markdown) {
  marked.parse(markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return hljs.highlightAuto(code).value
      }
    },
    (error, parseResult) => {
      html.value = parseResult
    })
}

watch (content, debounce((newVal) => {
  parseHtml(newVal)
}, 250), {
  immediate: true
})

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('Node content is not found')
  }
  contentEditable.value.innerText = content.value
})

function editContent() {
  if (!contentEditable.value) {
    throw Error('Node content is not found')
  } else {
    content.value = <string>contentEditable.value?.innerText
  }
}

async function savePost () {
  const newPost: Post = {
    ...props.post,
    authorID: usersStore.currentUserId,
    title: title.value,
    markdown: content.value,
    html: html.value,
    img: img.value
  }
  emit('submit', newPost)
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input type="text" class="input" v-model="title">
      </div>
      <div class="field">
        <div class="label">Post img URL</div>
        <input type="text" class="input" placeholder="https://somewhere.com/img.png" v-model.trim="img">
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div class="label">Post Markup</div>
      <div class="editor-col" contenteditable ref="contentEditable" @input="editContent"/>
    </div>
    <div class="column">
      <div class="label">Post Preview</div>
      <div class="editor-text" v-html="html"/>
    </div>
  </div>
  <div class="buttons">
    <div class="button is-primary" @click="savePost">
      Save Post
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

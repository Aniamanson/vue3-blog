<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'
import moment from 'moment'

const time = computed(() => {
  return new Date().getFullYear()
})

const showToTop = ref(false)

function userScroll () {
  showToTop.value = window.scrollY > 100
}

function scrollToTop () {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

onMounted (() => {
  window.addEventListener('scroll', userScroll)
})

onUnmounted (() => {
  window.removeEventListener('scroll', userScroll);
})
</script>

<template>
  <footer>
    <button v-if="showToTop" class="button__to-top" @click.prevent="scrollToTop()">
      <img src="../assets/img/to-top.png" alt="to-top button" />
    </button>

    <div class="container">
      <span>
        <strong>@{{ time }}</strong>
      </span>
      <span>
        Developer <a href="https://t.me/aniamanson">Anna Vershkova</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: aliceblue;
}

</style>

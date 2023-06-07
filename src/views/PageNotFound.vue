<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'
import Loader from '../components/Loader.vue'
import HomeBanner from '../components/HomeBanner.vue'
</script>

<template>
  <div class="columns">
    <div class="column">
    </div>
    <div class="column">
      <img src="../assets/img/404.avif" alt="page not found">
      <RouterLink to="/" class="button is-primary">
        Go Home
      </RouterLink>
    </div>
    <div class="column"></div>
  </div>
</template>

<style scoped>
a {
  display: block;
  max-width: fit-content;
  margin: -2rem auto 0;
}
img {
  max-width: calc(600px - 3rem);
  margin-top: -3rem;
}
@media (max-width: 768px) {
  img {
    max-width: calc(767px - 3rem);
    width: 100%;
    margin-top: 0;
  }
}
</style>

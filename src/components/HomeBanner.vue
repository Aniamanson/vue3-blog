<script setup lang="ts">
import { usePosts } from '../store/posts'
import { Typed } from '@duskmoon/vue3-typed-js'
import type { TypedOptions } from '@duskmoon/vue3-typed-js'
import { useUsers } from '../store/users'

const postsStore = usePosts()

const options: TypedOptions = {
  strings: ["&lt;Awersome IT Blog!/>", "# USE MY POWER", "{ TO BE A CODE HERO! }"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 50,
  cursorChar: '',
}
</script>

<template>
  <section class="hero-banner">
    <div class="columns is-align-items-center">
      <div class="column is-half">
        <div class="hero-text">
          <Typed :options="options">
            <h1 class="hero-title typing"></h1>
          </Typed>
          <p class="subtitle">
            Use all <strong>blog instruments</strong> to write & share you <strong>thoughts and experience</strong> with your audience.
          </p>
          <div class="buttons">
            <RouterLink to="/posts" class="button is-medium is-primary">
              Show Blog
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <img class="hero-img" src="../assets/img/coder.png" alt="programmer blog">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,600;1,600&display=swap');
.hero {
  &-banner {
    width: 100%;
    padding: 5rem 0 0;
    display: flex;
    @media (max-width: 1100px) {
      padding-top: 5rem;
    }
    @media (max-width: 767px) {
      padding: 3rem 0 3rem;
    }
  }
  &-info {
    display: flex;
    width: 100%;
  }
  &-text {
    width: 550px;
    margin-right: 1rem;
    @media (max-width: 600px) {
      width: auto;
      margin-right: 0;
    }
    h1 {
      font-size: 2.6rem;
      height: 2rem;
      margin-bottom: 2rem;
      @media (max-width: 1400px) {
        font-size: 2rem;
      }
      @media (max-width: 500px) {
        font-size: 6vw;
        margin-bottom: 0;
      }
    }
    .subtitle {
      font-size: 1.5rem;
      max-width: 350px;
      @media (max-width: 500px) {
        font-size: 1rem;
        max-width: 100%;
      }
      strong {
        color: #3e8ed0 !important;
      }
    }
  }
  &-img {
    max-width: 650px;
    width: 100%;
    @media (max-width: 1200px) {
      max-width: calc(100vw - 3rem);
    }
  }
  &-title {
    font-family: 'Roboto Mono', monospace;
  }
}
.buttons {
  margin-top: 2rem;
}
button {
  text-transform: uppercase;
}
</style>

<script setup lang="ts">
import { useModal } from '../composables/modal'
const modal = useModal()

</script>

<template>
  <div class="card mini">
    <div class="card-content">
      <div class="content">
        <p class="title is-4 is-spaced">
          <slot name="title"></slot>
        </p>
        <div class="field is-grouped">
          <div class="control">
            <slot name="button"></slot>
          </div>
          <div class="control">
            <button class="button is-light" @click.prevent="modal.hideModal()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini {
  max-width: 350px;
  margin: 0 auto;
}
.title {
  text-align: center;
}
.is-grouped {
  margin: 1rem auto 0;
  width: fit-content;
}
</style>

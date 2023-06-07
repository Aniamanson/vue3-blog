<script setup lang="ts">
import { useNotification } from '../composables/notification'
import { computed } from 'vue'

const notification = useNotification()

const modalStyle = computed(() => notification.show.value ? 'display: block;' : 'display: none;')
</script>

<template>
  <transition>
    <div class="notification" :class='notification.type.value' :style="modalStyle">
      <button class="delete" @click.stop="notification.hideNotification()" />
      <div id="notify" />
    </div>
  </transition>
</template>

<style scoped>
  .notification {
    position: fixed;
    bottom: 0;
    right: 1rem;
    z-index: 20;
  }
  .v-enter-from {
    opacity: 0
  }
  .v-enter-to {
    opacity: 1
  }
  .v-enter-active {
    transition: opacity 2s ease
  }
</style>

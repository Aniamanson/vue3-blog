<script setup lang="ts">
import { useModal } from '../composables/modal'
import {computed, onBeforeUnmount, onMounted} from 'vue'

const modal = useModal()

const modalStyle = computed(() => modal.show.value ? 'display: flex;' : 'display: none;')
</script>

<template>
  <div class="modal" style="color: white;" :style="modalStyle">
    <div class="modal-background" @click.stop="modal.hideModal()" />
    <div class="modal-content">
      <div id="modal" />
      <button class="modal-close is-large" @click="modal.hideModal()" />
    </div>
  </div>
</template>

<style scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1rem;
  }
</style>

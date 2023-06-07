<script setup lang="ts">
import { useModal } from '../composables/modal'
import { useUsers } from '../store/users'

const modal = useModal()
const usersStore = useUsers()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button is-info">New Post</RouterLink>
        <button class="button" @click.prevent="modal.showModal('confirmLogout')">Log Out</button>
      </div>
      <div v-else class="buttons">
        <button class="button" @click.prevent="modal.showModal('signUp')">Sign Up</button>
        <button class="button is-info" @click.prevent="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value"></component>
  </Teleport>
</template>

<style scoped>
</style>

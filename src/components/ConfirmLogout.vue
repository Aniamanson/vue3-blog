<script setup lang="ts">
import { useUsers } from '../store/users'
import { useModal } from '../composables/modal'
import Confirmation from './Confirmation.vue'
import { useRouter} from 'vue-router'

const usersStore = useUsers()
const modal = useModal()
const router = useRouter()

async function logout () {
  await usersStore.logout()
  modal.hideModal()
  router.push({ path: '/'})
}

</script>

<template>
  <Confirmation>
    <template #title>
      Are you sure you want to log out?
    </template>
    <template #button>
      <button class="button is-primary" @click.prevent="logout" type="submit">Log Out</button>
    </template>
  </Confirmation>
</template>

<style scoped>
</style>

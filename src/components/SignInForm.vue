<script setup lang="ts">
import { useModal } from '../composables/modal'
import { NewUser } from '../users'
import { useUsers } from '../store/users'
import UserForm from './UserForm.vue'
import { useErrors } from '../store/error'
import { computed } from 'vue'

const modal = useModal()
const usersSrore = useUsers()
const error = useErrors()

const loginError = computed(() => {
  if (error.currentPlace === 'login') {
    return error.currentError
  } else {
    return ''
  }
})

async function submitForm (newUser: NewUser) {
  const resp = await usersSrore.login(newUser)
  resp ? modal.hideModal() : false
}



</script>

<template>
  <UserForm title="Sign in here" @submit="submitForm" :error="loginError" />
</template>

<style lang="scss" scoped>
</style>

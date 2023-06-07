<script setup lang="ts">
import { useModal } from '../composables/modal'
import { NewUser } from '../users'
import { useUsers } from '../store/users'
import UserForm from "./UserForm.vue";

const modal = useModal()
const usersSrore = useUsers()

async function submitForm (newUser: NewUser) {
  await usersSrore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm title="Sign up here" @submit="submitForm" />
</template>

<style lang="scss" scoped>
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { validate, length, required, password } from '../validation'
import FormInput from './FormInput.vue'
import { useModal } from '../composables/modal'
import { useErrors } from '../store/error'
import { NewUser } from '../users'

const modal = useModal()

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()
const props = defineProps<{
  title: string,
  error?: string
}>()

const username = ref('')
const userPassword = ref('')
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({min: 2, max: 20})])
})
const passwordStatus = computed(() => {
  return validate(userPassword.value, [required, password, length({min: 6, max: 15})])
})
const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid
})

async function submitForm () {
  if (!isInvalid.value) {
    const newUser: NewUser = {
      username: username.value,
      password: userPassword.value
    }

    try {
      emit('submit', newUser)
      useErrors().setError({ currentError: '', currentPlace: '' })
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h1 style="margin: 0 0 30px 0">
          {{ props.title }}
        </h1>
        <p v-if="props.error" class="is-danger help">
          {{ props.error }}
        </p>
        <form class="form">
          <FormInput name="Username" v-model="username" :input-status="usernameStatus" type="text" />
          <FormInput name="Password" v-model="userPassword" :input-status="passwordStatus" type="password" />
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" :disabled="isInvalid" @click.prevent="submitForm" type="submit">Submit</button>
            </div>
            <div class="control">
              <button class="button is-light" @click.prevent="modal.hideModal()">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-title {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { password, Status } from '../validation'

const props = defineProps<{
  name: string,
  modelValue: string,
  inputStatus: Status,
  type: string
}>()

let isDirty = false
let isSownPassword = ref(false)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const isInvalid = computed (() => {
  return !props.inputStatus.valid && isDirty
})

const inputType = computed (() => {
  if (props.type === 'password' && !isSownPassword.value) {
    return 'password'
  } else if (props.type === 'password' && isSownPassword.value) {
    return 'text'
  }
  return props.type
})

function handleInput (e: Event) {
  isDirty = true
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">
      {{ name }}
    </label>
    <div class="control">
      <input
        :type="inputType"
        :id="props.name"
        class="input"
        :class="{'is-danger': isInvalid, 'is-success': inputStatus.valid}"
        :value="modelValue"
        @input="handleInput"
      >
      <template v-if="props.name === 'Password'">
        <img v-if="!isSownPassword" class="password-eye" src="../assets/img/eye-closed.png" alt="eye-closed" @click="isSownPassword = true">
        <img v-else class="password-eye" src="../assets/img/eye-opened.png" alt="eye-opened" @click="isSownPassword = false">
      </template>
    </div>
    <p v-if="isInvalid" class="is-danger help">
      {{ inputStatus.message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.password-eye {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  cursor: pointer;
  padding: 1rem;
  box-sizing: content-box;
}
</style>

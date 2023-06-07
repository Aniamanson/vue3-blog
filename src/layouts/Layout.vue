<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Modal from '../components/Modal.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Notification from '../components/Notification.vue'
import { useNotification } from '../composables/notification'
import { useUsers } from '../store/users'
import Footer from '../components/Footer.vue'

const notification = useNotification()
const users = useUsers()

function setAgreeCookie () {
  localStorage.setItem('cookie', 'agreed')
  notification.hideNotification()
}

onMounted (() => {
  setTimeout(() => {
    if (localStorage.getItem('cookie') !== 'agreed') {
      notification.showNotification()
    }
  }, 5000)
  users.authentication()
})
</script>

<template>
  <Modal />
  <Notification />

  <section class="main">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </section>

  <Footer />

  <Teleport to="#notify">
    <p>🍪 Hi! We would like to inform you <br>that this website uses cookies.</p>
    <div class="buttons">
      <button class="button is-info is-pulled-right" @click.prevent="setAgreeCookie">I got milk 🥛</button>
    </div>
  </Teleport>
</template>


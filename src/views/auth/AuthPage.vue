<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
const router = useRouter()
const user = userStore()
onMounted(() => {
  if (user.getAuthStatus) {
    router.push('/')
  }
})
</script>
<template>
  <div>
    <div class="auth-navigation">
      <router-link class="link" to="/auth">Войти</router-link>
      <router-link class="link" to="/auth/signup">Регистрация</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

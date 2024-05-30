<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/user'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

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
      <CommonLink class="link" :to="{ name: 'Signin' }">Войти</CommonLink>
      <CommonLink class="link" :to="{ name: 'Signup' }">Регистрация</CommonLink>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

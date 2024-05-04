<script setup>
import Fetcher from '@/Fetcher'
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const user = userStore()
const router = useRouter()
const login = ref('')
const password = ref('')
const fetcher = Fetcher()
function send() {
  const data = {
    login: login.value,
    password: password.value
  }

  fetcher
    .post('/user/signin', data)
    .then((res) => {
      fetcher.setToken(res.accessToken)
      user.fieldUser(res.userData)
      router.push('/')
    })
    .catch((err) => console.log(err))
}
</script>
<template>
  <div>
    <h1 align="center">Вход</h1>
    <div class="form">
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-login">Логин</label>
        <input class="form-group-input" id="mono-gatari-login" type="text" v-model="password" />
      </div>
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-password">Пароль</label>
        <input class="form-group-input" id="mono-gatari-password" type="password" v-model="login" />
      </div>
      <div class="btns">
        <button @click="send" class="send">Войти</button>
      </div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>

<script setup>
import Fetcher from '@/Fetcher'
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const user = userStore()
const router = useRouter()
const fetcher = Fetcher()
const login = ref('')
const nickname = ref('')
const email = ref('')
const password = ref('')

function send() {
  const data = {
    login: login.value,
    password: password.value,
    nickname: nickname.value,
    email: email.value
  }

  fetcher
    .post('/user/signup', data)
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
    <h1 align="center">Регистрация</h1>
    <div class="form">
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-login">Логин</label>
        <input class="form-group-input" id="mono-gatari-login" type="text" v-model="password" />
      </div>
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-password">Пароль</label>
        <input class="form-group-input" id="mono-gatari-password" type="password" v-model="login" />
      </div>
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-nickname">Имя</label>
        <input class="form-group-input" id="mono-gatari-nickname" type="text" v-model="nickname" />
      </div>
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-email">Почта</label>
        <input class="form-group-input" id="mono-gatari-email" type="text" v-model="email" />
      </div>
      <div class="btns">
        <button disabled @click="send" class="send">Отправить</button>
      </div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>

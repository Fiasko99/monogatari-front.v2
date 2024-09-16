<script setup>
import Fetcher from './Fetcher'
import { onMounted } from 'vue'
import { userStore } from '@/stores/user.js'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import { useRouter } from 'vue-router';
document.querySelector('body').style.backgroundImage = `url("${import.meta.env.VITE_APP_CDN_URL}/default/background.jpg")`

const router = useRouter()
const user = userStore()
const fetcher = Fetcher()

const existModalRegex = /\/modal(.*)/
if (location.pathname.match(existModalRegex)) {
  router.push(location.pathname.replace(existModalRegex, ''))
}

onMounted(() => {
  fetcher
    .baseRefreshReq()
    .then((res) => user.fieldUser(res.userData))
    .catch(() => user.fieldUser())
})
</script>

<template>
  <button style="position: absolute; top: 0; right: 0; z-index: 100;" @click="console.log(router.getRoutes())">test</button>
  <div data-theme="dark">
    <header class="header">
      <nav class="navigation">
        <div class="nav-left">
          <div title="Форум" class="nav-btn">
            <CommonLink :to="{ name: 'Regions' }" class="nav-link">
              <img src="./assets/home.svg" alt="" />
            </CommonLink>
          </div>
          <div v-if="user.getAuthStatus" title="Профиль" class="nav-btn">
            <CommonLink
              :to="{ name: 'Characters', params: { nickname: user.data.nickname } }"
              class="nav-link"
            >
              <img src="./assets/profile.svg" alt="" />
            </CommonLink>
          </div>
          <div v-else title="Профиль" class="nav-btn">
            <CommonLink :to="{ name: 'Signin' }" class="nav-link">
              <img src="./assets/profile.svg" alt="" />
            </CommonLink>
            <div class="transition-list">
              <CommonLink :to="{ name: 'Signin' }" class="link">Войти</CommonLink>
              <CommonLink :to="{ name: 'Signup' }" class="link">Регистрация</CommonLink>
            </div>
          </div>
        </div>
        <div class="nav-right">
          <div title="Карта" class="nav-btn right">
            <div class="nav-link">
              <img src="./assets/map.svg" alt="" />
            </div>
          </div>
          <div title="Поиск" class="nav-btn right">
            <div class="nav-link">
              <img src="./assets/search.svg" alt="" />
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer></footer>
  </div>
</template>

<style src="./style.css" />

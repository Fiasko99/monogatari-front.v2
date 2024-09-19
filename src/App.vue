<script setup>
import Fetcher from './Fetcher'
import { onMounted } from 'vue'
import { userStore } from '@/stores/user.js'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
document.querySelector('body').style.backgroundImage = `url("${import.meta.env.VITE_APP_CDN_URL}/default/background.jpg")`

const user = userStore()
const fetcher = Fetcher()

onMounted(() => {
  fetcher
    .baseRefreshReq()
    .then((res) => user.fieldUser(res.userData))
    .catch(() => user.fieldUser())
})
</script>

<template>
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

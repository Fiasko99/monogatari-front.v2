<script setup>
import Fetcher from './Fetcher'
import { onMounted } from 'vue'
import { userStore } from '@/stores/user.js'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

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
  <div class="themeDark">
    <header class="header">
      <nav class="navigation">
        <div class="nav-left">
          <div title="Форум" class="nav-btn">
            <CommonLink :to="{ name: 'Home' }" class="nav-link">
              <img src="./assets/home.svg" alt="" />
            </CommonLink>
            <div class="transition-list">
              <CommonLink :to="{ name: 'Active' }" class="link">Актив</CommonLink>
              <CommonLink :to="{ name: 'Rules' }" class="link">Правила</CommonLink>
              <CommonLink :to="{ name: 'History' }" class="link">История</CommonLink>
              <CommonLink :to="{ name: 'Events' }" class="link">События</CommonLink>
            </div>
          </div>
          <div v-if="user.getAuthStatus" title="Профиль" class="nav-btn">
            <CommonLink
              :to="{ name: 'Characters', params: { nickname: user.data.nickname } }"
              class="nav-link"
            >
              <img src="./assets/profile.svg" alt="" />
            </CommonLink>
            <div class="transition-list">
              <CommonLink
                v-if="user.activeCharacter"
                :to="{ name: 'Character', params: { id: user.activeCharacter.id } }"
                class="link"
                >Персонаж</CommonLink
              >
              <CommonLink
                :to="{ name: 'Settings', params: { nickname: user.data.nickname } }"
                class="link"
                >Настройки</CommonLink
              >
              <CommonLink
                :to="{ name: 'Logout', params: { nickname: user.data.nickname } }"
                class="link"
                >Выйти</CommonLink
              >
            </div>
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
            <div class="popup"></div>
          </div>
          <div title="Поиск" class="nav-btn right">
            <div class="nav-link">
              <img src="./assets/search.svg" alt="" />
            </div>
            <div class="popup"></div>
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

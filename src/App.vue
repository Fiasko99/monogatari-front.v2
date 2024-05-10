<script setup>
import Fetcher from './Fetcher'
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { userStore } from '@/stores/user.js'
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
  <header class="header">
    <nav class="navigation">
      <div class="nav-left">
        <div title="Форум" class="nav-btn">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            <img src="./assets/home.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link :to="{ name: 'Active' }" class="link">Актив</router-link>
            <router-link :to="{ name: 'Rules' }" class="link">Правила</router-link>
            <router-link :to="{ name: 'History' }" class="link">История</router-link>
            <router-link :to="{ name: 'Events' }" class="link">События</router-link>
          </div>
        </div>
        <div v-if="user.getAuthStatus" title="Профиль" class="nav-btn">
          <router-link
            :to="{ name: 'Characters', params: { nickname: user.data.nickname } }"
            class="nav-link"
          >
            <img src="./assets/profile.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link
              v-if="user.activeCharacter"
              :to="{ name: 'Character', params: { id: user.activeCharacter.id } }"
              class="link"
              >Персонаж</router-link
            >
            <router-link
              :to="{ name: 'Settings', params: { nickname: user.data.nickname } }"
              class="link"
              >Настройки</router-link
            >
            <router-link
              :to="{ name: 'Logout', params: { nickname: user.data.nickname } }"
              class="link"
              >Выйти</router-link
            >
          </div>
        </div>
        <div v-else title="Профиль" class="nav-btn">
          <router-link :to="{ name: 'Signin' }" class="nav-link">
            <img src="./assets/profile.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link :to="{ name: 'Signin' }" class="link">Войти</router-link>
            <router-link :to="{ name: 'Signup' }" class="link">Регистрация</router-link>
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
</template>

<style src="./style.css" />

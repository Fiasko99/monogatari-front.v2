<script setup>
import fetcher from './Fetcher'
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { userStore } from '@/stores/user.js'
const user = userStore()
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
          <router-link to="/" class="nav-link">
            <img src="./assets/home.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link to="/rules" class="link">Правила</router-link>
            <router-link to="/active" class="link">Актив</router-link>
            <router-link to="/history" class="link">История</router-link>
            <router-link to="/events" class="link">События</router-link>
          </div>
        </div>
        <div v-if="user.getAuthStatus" title="Профиль" class="nav-btn">
          <router-link :to="'/profile/' + user.data.nickname" class="nav-link">
            <img src="./assets/profile.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link
              v-if="user.activeCharacter"
              :to="`/character/${user.activeCharacter.id}`"
              class="link"
              >Персонаж</router-link
            >
            <router-link :to="`/profile/${user.data.nickname}/settings`" class="link"
              >Настройки</router-link
            >
            <router-link :to="`/profile/${user.data.nickname}/logout`" class="link"
              >Выйти</router-link
            >
          </div>
        </div>
        <div v-else title="Профиль" class="nav-btn">
          <router-link to="/auth" class="nav-link">
            <img src="./assets/profile.svg" alt="" />
          </router-link>
          <div class="transition-list">
            <router-link to="/auth" class="link">Войти</router-link>
            <router-link to="/auth/signup" class="link">Регистрация</router-link>
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

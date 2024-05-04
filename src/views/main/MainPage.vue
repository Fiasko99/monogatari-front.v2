<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div class="main-navigation">
      <router-link class="link" to="/">Мир</router-link>
      <router-link class="link" to="/rules">Правила</router-link>
      <router-link class="link" to="/active">Активные темы</router-link>
      <router-link class="link" to="/history">История мира</router-link>
      <router-link class="link" to="/events">События</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

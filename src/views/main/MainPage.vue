<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>
<template>
  <div>
    <div class="main-navigation">
      <router-link class="link" :to="{ name: 'Home' }">Мир</router-link>
      <router-link class="link" :to="{ name: 'Active' }">Активные темы</router-link>
      <router-link class="link" :to="{ name: 'Rules' }">Правила</router-link>
      <router-link class="link" :to="{ name: 'History' }">История мира</router-link>
      <router-link class="link" :to="{ name: 'Events' }">События</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

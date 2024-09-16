<script setup>
import { RouterView } from 'vue-router'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
</script>
<template>
  <div>
    <div class="main-navigation">
      <CommonLink :to="{ name: 'History' }">История</CommonLink>
      <CommonLink :to="{ name: 'Rules' }">Правила</CommonLink>
      <CommonLink :to="{ name: 'Events' }">События</CommonLink>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

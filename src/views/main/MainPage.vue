<script setup>
import { RouterView } from 'vue-router'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

</script>
<template>
  <div>
    <div class="main-navigation">
      <CommonLink :to="{ name: 'Regions' }">Регионы</CommonLink>
      <CommonLink :to="{ name: 'Active' }">Активные темы</CommonLink>
      <CommonLink :to="{ name: 'History' }">Мир</CommonLink>
    </div>
    <hr />
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

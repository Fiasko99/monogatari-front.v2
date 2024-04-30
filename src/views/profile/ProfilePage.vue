<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView, RouterLink } from 'vue-router'
import fetcher from '@/Fetcher'
const route = useRoute()
const user = ref()
onMounted(() => {
  fetcher
    .get('/user/' + route.params.nickname)
    .then((res) => (user.value = res))
    .catch((err) => console.log(err))
})
</script>
<template>
  <div v-if="user">
    <h1 align="center">Профиль</h1>
    <div class="links">
      <router-link :to="`/profile/${route.params.nickname}`">Персонажи</router-link>
      <router-link :to="`/profile/${route.params.nickname}/settings`">Настройки</router-link>
    </div>
    <hr />
    <router-view :characters="user.characters" />
  </div>
</template>
<style scoped src="./style.css"></style>

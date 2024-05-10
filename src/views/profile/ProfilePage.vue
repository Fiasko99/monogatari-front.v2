<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView, RouterLink } from 'vue-router'
import Fetcher from '@/Fetcher'
const route = useRoute()
const user = ref()
const fetcher = Fetcher()
function updateData() {
  fetcher
    .get('/user/' + route.params.nickname)
    .then((res) => (user.value = res))
    .catch((err) => console.error(err))
}
onMounted(() => {
  updateData()
})
</script>
<template>
  <div v-if="user">
    <div class="profile-navigation">
      <router-link :to="{ name: 'Characters', params: { nickname: route.params.nickname } }"
        >Персонажи</router-link
      >
      <router-link :to="{ name: 'Settings', params: { nickname: route.params.nickname } }"
        >Настройки</router-link
      >
    </div>
    <hr />
    <div class="user">
      <div class="nickname">Никнейм {{ user.nickname }}</div>
      <div class="email">Почта {{ user.email }}</div>
    </div>
    <hr />
    <router-view :characters="user.characters" @updateData="updateData" />
  </div>
</template>
<style scoped src="./style.css"></style>

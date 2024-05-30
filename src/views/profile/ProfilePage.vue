<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import Fetcher from '@/Fetcher'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

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
      <CommonLink :to="{ name: 'Characters', params: { nickname: route.params.nickname } }"
        >Персонажи</CommonLink
      >
      <CommonLink :to="{ name: 'Settings', params: { nickname: route.params.nickname } }"
        >Настройки</CommonLink
      >
      <CommonLink :to="{ name: 'Logout', params: { nickname: route.params.nickname } }" class="link"
        >Выйти</CommonLink
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

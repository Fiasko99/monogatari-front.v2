<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const character = ref()
const fetcher = Fetcher()
onMounted(() => {
  fetcher
    .get('/character/' + route.params.id)
    .then((res) => (character.value = res))
    .catch((err) => console.error(err))
})
</script>
<template>
  <div v-if="character">
    <h1 align="center">Персонаж</h1>
    <div class="character">
      <div class="name">{{ character.name }}</div>
      <div>{{ character.active ? 'Активен' : 'Неактивен' }}</div>
    </div>
    <hr />
    <div class="posts">
      <div class="post" v-for="post in character.posts" :key="post.id">
        <div class="location">
          {{ post.location.area.region.name }} -> {{ post.location.area.name }} ->
          <router-link :to="`/location/${post.location.id}`">{{ post.location.name }}</router-link>
        </div>
        <div class="text">{{ post.text }}</div>
      </div>
    </div>
  </div>
  <div v-else>Персонажа не существует</div>
</template>
<style scoped src="./style.css"></style>

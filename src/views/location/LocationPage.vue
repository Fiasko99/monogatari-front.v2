<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
const location = ref()
const fetcher = Fetcher()
onMounted(() => {
  const route = useRoute()
  const id = route.params.id
  fetcher
    .get('/location/' + id)
    .then((res) => (location.value = res))
    .catch((err) => console.log(err))
})
</script>
<template>
  <div v-if="location">
    <h1 align="center">Локация</h1>
    <h2>
      {{ location.area.region.name }}
      -> {{ location.area.name }} ->
      {{ location.name }}
    </h2>
    <div v-for="post in location.posts" :key="post.id">
      <div>
        <router-link :to="'/profile/' + post.character.user.nickname">{{
          post.character.user.nickname
        }}</router-link>
        ->
        <router-link :to="`/character/${post.character.id}`">{{ post.character.name }}</router-link>
      </div>
      <div>{{ post.text }}</div>
      <hr />
    </div>
  </div>
  <h1 v-else>Локация не существует</h1>
</template>
<style scoped src="./style.css"></style>

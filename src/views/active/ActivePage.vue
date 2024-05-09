<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const locations = ref()
const fetcher = Fetcher()
onMounted(() => {
  fetcher
    .get('/location/active')
    .then((res) => {
      locations.value = res
    })
    .catch((err) => console.error(err))
})
</script>
<template>
  <div>
    <h1 align="center">Активные локации</h1>
    <div v-if="locations" class="locations">
      <div v-for="location in locations" :key="location.id" class="location">
        <div class="title">
          <div class="path">
            {{ location.area.region.name }} -> {{ location.area.name }} ->
            <router-link :to="'/location/' + location.id">{{ location.name }}</router-link>
          </div>
          <div class="post-id">
            {{ location.posts[0].id }}
            {{ new Date(location.posts[0].createdAt).getMilliseconds() }}ms
          </div>
        </div>
        <div class="post-info">
          <div class="post">{{ location.posts[0].text }}</div>
          <div class="info">
            <router-link :to="'/profile/' + location.posts[0].character.user.nickname">{{
              location.posts[0].character.user.nickname
            }}</router-link>
            ->
            <router-link :to="'/character/' + location.posts[0].character.id">{{
              location.posts[0].character.name
            }}</router-link>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div v-else>Активных тем не найдено</div>
  </div>
</template>
<style scoped src="./style.css"></style>

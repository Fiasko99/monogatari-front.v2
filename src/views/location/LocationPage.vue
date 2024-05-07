<script setup>
import Fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
const fetcher = Fetcher()
const location = ref()
const post = ref('')
const isShowPostForm = ref(false)
const route = useRoute()
const user = userStore()
const locationId = route.params.id
const character = user.activeCharacter
function showCreatePost() {
  isShowPostForm.value = !isShowPostForm.value
}
function sendPost() {
  const data = {
    text: post.value,
    characterId: character.id,
    locationId
  }
  fetcher
    .post('/post/create', data)
    .then(() => updateData())
    .catch((err) => console.error(err))
}
function updateData() {
  fetcher
    .get('/location/' + locationId)
    .then((res) => (location.value = res))
    .catch((err) => console.error(err))
}
onMounted(() => {
  updateData()
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
    <div v-if="character" class="create-post">
      <button @click="showCreatePost" class="create-post-btn">Написать пост</button>
      <div v-if="isShowPostForm" class="post-form">
        <textarea class="textarea" rows="10" v-model="post"></textarea>
        <div class="btns">
          <button @click="sendPost" class="send">Отправить</button>
        </div>
      </div>
    </div>
    <div v-for="post in location.posts" :key="post.id">
      <div class="title">
        <div>
          <router-link :to="'/profile/' + post.character.user.nickname">{{
            post.character.user.nickname
          }}</router-link>
          ->
          <router-link :to="`/character/${post.character.id}`">{{
            post.character.name
          }}</router-link>
        </div>
        <div>{{ post.id }} {{ new Date(post.createdAt).getMilliseconds() }}ms</div>
      </div>
      <div>{{ post.text }}</div>
      <hr />
    </div>
  </div>
  <h1 v-else>Локация не существует</h1>
</template>
<style scoped src="./style.css"></style>

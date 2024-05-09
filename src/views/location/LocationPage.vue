<script setup>
import Fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useModal from '@/helpers/openModal/index.js'

const route = useRoute()
const openModal = useModal(useRouter(), route)
const user = userStore()
const fetcher = Fetcher()
const location = ref()
const postText = ref(null)
const isShowPostForm = ref(false)

const locationId = route.params.id
const character = user.activeCharacter

function showCreatePost() {
  isShowPostForm.value = !isShowPostForm.value
}

function sendPost() {
  const data = {
    text: postText.value.innerHTML,
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

function applyFormatterText(type, tag = null) {
  postText.value.focus()
  document.execCommand(type, false, tag)
}

function paste(e) {
  e.preventDefault()
  var text = (e.originalEvent || e).clipboardData.getData('text/plain')
  document.execCommand('paste', false, text)
}

onMounted(() => {
  updateData()
})
</script>
<template>
  <div v-if="location">
    <button @click="openModal('Home')">Модалка</button>
    <h1 align="center">Локация</h1>
    <h2>
      {{ location.area.region.name }}
      -> {{ location.area.name }} ->
      {{ location.name }}
    </h2>
    <div v-if="character" class="create-post">
      <button @click="showCreatePost" class="create-post-btn">Написать пост</button>
      <div v-if="!isShowPostForm" class="post-form">
        <div class="style-btns">
          <button class="style-btn" @click="applyFormatterText('bold')">strong</button>
          <button class="style-btn" @click="applyFormatterText('italic')">em</button>
          <button class="style-btn" @click="applyFormatterText('strikeThrough')">strike</button>
          <button class="style-btn" @click="applyFormatterText('underline')">underline</button>
          <button class="style-btn" @click="applyFormatterText('formatBlock', '<h1>')">
            heading1
          </button>
          <button class="style-btn" @click="applyFormatterText('formatBlock', '<h2>')">
            heading2
          </button>
          <button class="style-btn" @click="applyFormatterText('formatBlock', '<h3>')">
            heading3
          </button>
          <button class="style-btn" @click="applyFormatterText('formatBlock', '<blockquote>')">
            qoute
          </button>
          <button class="style-btn" @click="applyFormatterText('formatBlock', 'div')">
            delete styles
          </button>
        </div>
        <pre class="textarea" contenteditable="true" @paste="paste" ref="postText"></pre>
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
      <div v-html="post.text"></div>
      <hr />
    </div>
  </div>
  <h1 v-else>Локация не существует</h1>
  <router-view />
</template>
<style scoped src="./style.css"></style>

<script setup>
import Fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const route = useRoute()
const router = useRouter()
const user = userStore()
const fetcher = Fetcher()

const location = ref()
const posts = ref()

const postsCount = ref()
const showPostsCount = ref(10)

const isShowPostForm = ref(false)
const postText = ref(null)

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

function getPosts() {
  let url = `/post/location/${locationId}`
  const { page, limit } = route.query
  if (page || limit) {
    const queryParams = []
    page && queryParams.push(`offset=${(page - 1) * showPostsCount.value}`)
    limit && queryParams.push(`limit=${limit}`)
    url += `/?${queryParams.join('&')}`
  }
  fetcher
    .get(url)
    .then((res) => (posts.value = res))
    .catch((err) => console.error(err))
}

function getLocation() {
  fetcher
    .get('/location/' + locationId)
    .then((res) => (location.value = res))
    .catch((err) => console.error(err))
}

function getPostsCount() {
  fetcher
    .get('/post/count/location/' + locationId)
    .then((res) => (postsCount.value = res))
    .catch((err) => console.error(err))
}

function updateData() {
  getPosts()
  getLocation()
  getPostsCount()
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

function changePage(e) {
  router.replace({
    name: 'Location',
    params: { id: route.params.id },
    query: {
      ...route.query,
      page: e.target.value
    }
  })
}

function changeShowPostsCount(e) {
  router.replace({
    name: 'Location',
    params: { id: route.params.id },
    query: {
      ...route.query,
      limit: e.target.value
    }
  })
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
    <div v-if="postsCount" class="pagination">
      <select @change="changeShowPostsCount" v-model="showPostsCount">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
      <input
        type="number"
        :min="1"
        :max="Math.ceil(postsCount / showPostsCount)"
        :placeholder="route.query.page"
        @input="changePage"
      />
      <button @click="getPosts">Перейти</button>
    </div>
    <div v-if="posts" class="posts">
      <div v-for="post in posts" :key="post.id">
        <div class="title">
          <div>
            <router-link
              :to="{ name: 'Characters', params: { nickname: post.character.user.nickname } }"
              >{{ post.character.user.nickname }}</router-link
            >
            ->
            <router-link :to="{ name: 'Character', params: { id: post.character.id } }">{{
              post.character.name
            }}</router-link>
          </div>
          <div>{{ post.id }} {{ new Date(post.createdAt).getMilliseconds() }}ms</div>
        </div>
        <div v-html="post.text"></div>
        <hr />
      </div>
    </div>
  </div>
  <h1 v-else>Локация не существует</h1>
</template>
<style scoped src="./style.css"></style>

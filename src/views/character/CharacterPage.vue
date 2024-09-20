<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CharacterPosts from './components/character-posts/CharacterPosts.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'
import defAvatar from '@/heplers/def-avatar'

const route = useRoute()
const fetcher = Fetcher()

const character = ref()
const characterPosts = ref()
const countCharacterPosts = ref()

const loadingCharacterPosts = ref(false)

const characterId = route.params.characterId

function getCharacter() {
  fetcher
    .get('/character/' + characterId)
    .then((res) => (character.value = res))
    .catch((err) => console.error(err))
}

function getCharacterPosts() {
  loadingCharacterPosts.value = true
  let url = `/post/character/${characterId}`
  const { page, limit } = route.query
  if (page || limit) {
    const queryParams = []
    page && queryParams.push(`page=${page}`)
    limit && queryParams.push(`limit=${limit}`)
    url += `/?${queryParams.join('&')}`
  }
  fetcher
    .get(url)
    .then((res) => (characterPosts.value = res))
    .catch((err) => console.error(err))
    .finally(() => (loadingCharacterPosts.value = false))
}

function getCountCharacterPosts() {
  fetcher
    .get('/post/count/character/' + characterId)
    .then((res) => (countCharacterPosts.value = res))
    .catch((err) => console.error(err))
}

function updateData() {
  getCharacter()
  getCharacterPosts()
  getCountCharacterPosts()
}

onMounted(() => {
  updateData()
})
</script>
<template>
  <div v-if="character">
    <first-heading center>Персонаж</first-heading>
    <div class="character">
      <div class="left">
        <div class="imageWrapper">
          <img class="image" :src="defAvatar(character.avatar)" />
        </div>
      </div>
      <div class="right">
        <div>
          Автор персонажа: 
          <CommonLink :to="{ name: 'Characters', params: { nickname: character.user.nickname } }">{{ character.user.nickname }}</CommonLink>
        </div>
        <div class="name">Имя персонажа: {{ character.name }}</div>
        <div>Статус: {{ character.active ? 'Активен' : 'Неактивен' }}</div>
      </div>
    </div>
    <hr />
    <CommonPagination
      v-if="countCharacterPosts"
      :count="parseInt(countCharacterPosts)"
      @get-data="getCharacterPosts"
    />
    <CommonLoading full-page v-if="loadingCharacterPosts" />
    <div class="posts" v-else>
      <CharacterPosts v-if="characterPosts" :posts="characterPosts" />
      <div v-else>У персонажа нет постов</div>
    </div>
  </div>
  <div v-else>Персонажа не существует</div>
  <router-view></router-view>
</template>
<style scoped src="./style.css"></style>

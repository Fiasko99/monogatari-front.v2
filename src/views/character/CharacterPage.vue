<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CharacterPosts from './components/character-posts/CharacterPosts.vue'

const route = useRoute()
const fetcher = Fetcher()

const character = ref()
const characterPosts = ref()
const countCharacterPosts = ref()

const loadingCharacterPosts = ref(false)

const characterId = route.params.id

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
    <h1 align="center">Персонаж</h1>
    <div class="character">
      <div class="name">{{ character.name }}</div>
      <div>{{ character.active ? 'Активен' : 'Неактивен' }}</div>
    </div>
    <hr />
    <CommonPagination
      v-if="countCharacterPosts"
      :count="parseInt(countCharacterPosts)"
      @get-data="getCharacterPosts"
    />
    <CommonLoading v-if="loadingCharacterPosts" />
    <div>
      <CharacterPosts v-if="characterPosts" :posts="characterPosts" />
      <div v-else>У персонажа нет постов</div>
    </div>
  </div>
  <div v-else>Персонажа не существует</div>
</template>
<style scoped src="./style.css"></style>

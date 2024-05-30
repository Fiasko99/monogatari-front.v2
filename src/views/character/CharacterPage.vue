<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'

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
      <div v-if="characterPosts" class="posts">
        <div class="post" v-for="post in characterPosts" :key="post.id">
          <div class="title">
            <div class="location">
              {{ post.location.area.region.name }} -> {{ post.location.area.name }} ->
              <CommonLink :to="{ name: 'Location', params: { id: post.location.id } }">{{
                post.location.name
              }}</CommonLink>
            </div>
          </div>
          <div class="text" v-html="post.text"></div>
        </div>
      </div>
      <div v-else>У персонажа нет постов</div>
    </div>
  </div>
  <div v-else>Персонажа не существует</div>
</template>
<style scoped src="./style.css"></style>

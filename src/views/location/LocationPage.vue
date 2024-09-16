<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import ModalViewButton from '@/components/modal-view-btn/ModalViewBtn.vue'
import CreatePost from './components/create-post/CreatePostComponent.vue'
import PostsComponent from './components/posts/PostsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'

const route = useRoute()
const fetcher = Fetcher()

const location = ref()
const posts = ref()

const loadingPosts = ref(false)

const postsCount = ref()

const locationId = route.params.locationId

function getPosts() {
  loadingPosts.value = true
  let url = `/post/location/${locationId}`
  const { page, limit } = route.query
  if (page || limit) {
    const queryParams = []
    page && queryParams.push(`page=${page}`)
    limit && queryParams.push(`limit=${limit}`)
    url += `/?${queryParams.join('&')}`
  }
  fetcher
    .get(url)
    .then((res) => (posts.value = res))
    .catch((err) => console.error(err))
    .finally(() => (loadingPosts.value = false))
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
  getLocation()
  getPosts()
  getPostsCount()
}

onMounted(() => {
  updateData()
})
</script>
<template>
  <div v-if="location">
    <SecondHeading>
      <ModalViewButton v-bind="{ name: 'Region', params: {regionId: location.area.region.id}}">{{ location.area.region.name }}</ModalViewButton>
      &#11166; 
      <ModalViewButton v-bind="{ name: 'Area', params: {areaId: location.area.id}}">{{ location.area.name }}</ModalViewButton>
      &#11166;
      {{ location.name }}
    </SecondHeading>
    <CreatePost @update-data="updateData" />
    <CommonPagination v-if="postsCount" :count="parseInt(postsCount)" @get-data="getPosts" />
    <CommonLoading full-page v-if="loadingPosts" />
    <div class="posts" v-else>
      <PostsComponent v-if="posts" :posts="posts" />
      <span v-else>Постов еще нет, но вы можете написать первым!</span>
    </div>
  </div>
  <h1 v-else>Локация не существует</h1>
</template>
<style scoped src="./style.css"></style>

<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CreatePost from './components/create-post/CreatePostComponent.vue'
import PostsComponent from './components/posts/PostsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
import ModalComponent from '@/ui-kit/modal/ModalComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'
import defImg from '@/heplers/def-img'

const route = useRoute()
const fetcher = Fetcher()
const location = ref()
const posts = ref()
const loadingPosts = ref(false)
const postsCount = ref()
const locationId = route.params.locationId
const showLocationModal = ref(false)

function changeShowLocationModal() {
  showLocationModal.value = !showLocationModal.value
}

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
      <CommonLink :to="{ name: 'RegionInLocation', params: { regionId: location.area.region.id } }">
        {{ location.area.region.name }}
      </CommonLink>
      &#11166; 
      <CommonLink :to="{ name: 'AreaInLocation', params: { areaId: location.area.id }}">
        {{ location.area.name }}
      </CommonLink>
      &#11166;
      <CommonBtn @click="changeShowLocationModal">
        {{ location.name }}
      </CommonBtn>
      <ModalComponent v-if="showLocationModal" @close-modal="changeShowLocationModal">
        <FirstHeading>
          {{ location.name }}
        </FirstHeading>
        <div class="imageWrapper">
          {{ location }}
          <img :src="defImg(location.image)">
        </div>
        <div class="description">
          {{ location.description ? location.description : 'Описание не найдено'}}
        </div>
      </ModalComponent>
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
  <router-view></router-view>
</template>
<style scoped src="./style.css"></style>

<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'

const route = useRoute()

const activeLocations = ref()
const countActiveLocations = ref()
const loadingActiveLocations = ref(false)
const fetcher = Fetcher()

function getActiveLocations() {
  loadingActiveLocations.value = true
  let url = `/activeLocations/getAll`
  const { page, limit } = route.query
  if (page || limit) {
    const queryParams = []
    page && queryParams.push(`page=${page}`)
    limit && queryParams.push(`limit=${limit}`)
    url += `/?${queryParams.join('&')}`
  }
  fetcher
    .get(url)
    .then((res) => (activeLocations.value = res))
    .catch((err) => console.error(err))
    .finally(() => (loadingActiveLocations.value = false))
}

function getCountActiveLocations() {
  fetcher
    .get('/activeLocations/count/getAll')
    .then((res) => (countActiveLocations.value = res))
    .catch((err) => console.error(err))
}

function updateData() {
  getActiveLocations()
  getCountActiveLocations()
}

onMounted(() => {
  updateData()
})
</script>
<template>
  <div>
    <h1 align="center">Активные локации</h1>
    <CommonLoading v-if="!activeLocations" />
    <div v-else>
      <CommonPagination
        v-if="countActiveLocations"
        :count="parseInt(countActiveLocations)"
        @get-data="getActiveLocations"
      />
      <div v-if="activeLocations" class="activeLocations">
        <div
          v-for="activeLocation in activeLocations"
          :key="activeLocation.id"
          class="activeLocation"
        >
          <div class="title">
            <div class="path">
              {{ activeLocation.location.area.region.name }} ->
              {{ activeLocation.location.area.name }} ->
              <CommonLink :to="{ name: 'Location', params: { id: activeLocation.location.id } }">{{
                activeLocation.location.name
              }}</CommonLink>
            </div>
          </div>
          <div class="post-info">
            <div class="post" v-html="activeLocation.post.text"></div>
            <div class="info">
              <CommonLink
                :to="{
                  name: 'Characters',
                  params: { nickname: activeLocation.post.character.user.nickname }
                }"
                >{{ activeLocation.post.character.user.nickname }}</CommonLink
              >
              ->
              <CommonLink
                :to="{ name: 'Character', params: { id: activeLocation.post.character.id } }"
                >{{ activeLocation.post.character.name }}</CommonLink
              >
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div v-else>Активных тем не найдено</div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>

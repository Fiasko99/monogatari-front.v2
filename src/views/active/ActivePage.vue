<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import Fetcher from '@/Fetcher'
import DemoPosts from './components/demo-posts/ActiveLocations.vue'

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
      <DemoPosts v-if="activeLocations" :activeLocations="activeLocations" />
      <div v-else>Активных тем не найдено</div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>

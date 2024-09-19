<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'
import CommonPagination from '@/ui-kit/pagination/CommonPagination.vue'
import Fetcher from '@/Fetcher'
import DemoPosts from './components/demo-posts/ActiveLocations.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'

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
    <first-heading center>Активные локации</first-heading>
    <CommonLoading full-page v-if="!activeLocations" />
    <div class="activeLocations" v-else>
      <CommonPagination
        v-if="countActiveLocations"
        :count="parseInt(countActiveLocations)"
        @get-data="getActiveLocations"
      />
      <DemoPosts v-if="activeLocations && activeLocations.length" :activeLocations="activeLocations" />
      <div v-else>
        <SecondHeading center>Активных тем не найдено</SecondHeading>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>
<style scoped src="./style.css"></style>

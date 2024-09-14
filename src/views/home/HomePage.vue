<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import RegionsComponent from './components/regions/RegionsComponent.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'

const fetcher = Fetcher()
const regions = ref()
const loadRegions = ref(false)

onMounted(() => {
  loadRegions.value = true
  fetcher
    .get('/region/all')
    .then((res) => (regions.value = res))
    .catch((err) => console.error(err))
    .finally(() => (loadRegions.value = false))
})
</script>
<template>
  <CommonLoading full-page v-if="loadRegions" />
  <div class="map" v-else>
    <RegionsComponent :regions="regions" />
  </div>
</template>
<style scoped src="./style.css"></style>

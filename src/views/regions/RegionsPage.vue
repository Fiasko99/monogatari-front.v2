<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import RegionsComponent from './components/regions/RegionsComponent.vue'
import AddRegion from './components/add-region/AddRegion.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'

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
  <div class="heading-wrapper">
    <FirstHeading center>Регионы мира</FirstHeading>
    <add-region />
  </div>
  <CommonLoading full-page v-if="loadRegions" />
  <div class="world" v-else>
    <RegionsComponent :regions="regions" />
  </div>
  <router-view />
</template>
<style scoped src="./style.css"></style>

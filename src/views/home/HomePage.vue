<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import Kingdoms from './components/kingdoms/KingdomsComponent.vue'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'

const fetcher = Fetcher()
const kingdoms = ref()
const loadKingdoms = ref(false)

onMounted(() => {
  loadKingdoms.value = true
  fetcher
    .get('/region/all')
    .then((res) => (kingdoms.value = res))
    .catch((err) => console.error(err))
    .finally(() => (loadKingdoms.value = false))
})
</script>
<template>
  <CommonLoading v-if="loadKingdoms" />
  <div class="map" v-else>
    <Kingdoms :kingdoms="kingdoms" />
  </div>
</template>
<style scoped src="./style.css"></style>

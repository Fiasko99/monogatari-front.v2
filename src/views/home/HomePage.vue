<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
const map = ref()
const fetcher = Fetcher()

onMounted(() => {
  fetcher
    .get('/region/all')
    .then((res) => (map.value = res))
    .catch((err) => console.error(err))
})
</script>
<template>
  <div>
    <h1 align="center">Карта мира</h1>
    <div v-if="map" class="kingdoms">
      <div v-for="kingdom of map" :key="kingdom.name + kingdom.id" class="kingdom">
        <div class="title">{{ kingdom.name }}</div>
        <div v-if="kingdom.areas.length > 0" class="areas">
          <div v-for="area of kingdom.areas" :key="kingdom.name + area.name" class="area">
            <div class="title">{{ area.name }}</div>
            <div v-if="area.locations.length > 0" class="locations">
              <div
                v-for="location of area.locations"
                :key="kingdom.name + area.name + location.name"
                class="location"
              >
                <router-link :to="'/location/' + location.id" class="title">
                  {{ location.name }}
                </router-link>
              </div>
            </div>
            <div v-else class="locations">В области нет локаций</div>
          </div>
        </div>
        <div v-else class="areas">В регионе нет областей</div>
      </div>
    </div>
    <div v-else class="kingdoms">В мире нет регионов</div>
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

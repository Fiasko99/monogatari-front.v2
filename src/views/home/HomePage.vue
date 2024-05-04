<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
const map = ref()
const fetcher = Fetcher()
onMounted(() => {
  fetcher
    .get('/region/all')
    .then((res) => (map.value = res))
    .catch((err) => console.log(err))
})
</script>
<template>
  <h1 align="center">Карта мира</h1>
  <div v-if="map" class="kingdoms">
    <div v-for="kingdom of map" :key="kingdom.name + kingdom.id">
      <h2>{{ kingdom.name }}</h2>
      <div v-for="area of kingdom.areas" :key="kingdom.name + area.name">
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;{{ area.name }}</h3>
        <div v-for="location of area.locations" :key="kingdom.name + area.name + location.name">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link :to="'/location/' + location.id">
            {{ location.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Данные о мире не найдены</div>
</template>
<style scoped src="./style.css"></style>

<script setup>
import fetcher from '@/Fetcher'
import { onBeforeMount, ref } from 'vue'
const map = ref([])
onBeforeMount(async () => {
  map.value = await fetcher.get('/region/full').catch((err) => console.log(err))
})
</script>
<template>
  <h1 align="center">Карта мира</h1>
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
</template>
<style scoped src="./style.css"></style>

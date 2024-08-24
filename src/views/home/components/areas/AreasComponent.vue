<script setup>
import Locations from '../locations/LocationsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'

defineProps({
  areas: Array
})
</script>
<template>
  <div v-if="areas.length > 0" class="areas">
    <div v-for="area of areas" :key="area.id" class="area">
      <second-heading class="title">{{ area.name }}</second-heading>
      <Locations :locations="area.locations" />
    </div>
  </div>
  <div v-else class="areas">В регионе нет областей</div>
</template>
<style scoped src="./style.css"></style>

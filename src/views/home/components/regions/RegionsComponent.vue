<script setup>
import Areas from '../areas/AreasComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'

defineProps({
  regions: Array
})
</script>
<template>
  <div v-if="regions" class="regions">
    <div v-for="region of regions" :key="region.name + region.id" class="region">
      <first-heading class="title">{{ region.name }}</first-heading>
      <Areas :areas="region.areas" />
    </div>
  </div>
  <div v-else class="regions">В мире нет регионов</div>
</template>
<style scoped src="./style.css"></style>

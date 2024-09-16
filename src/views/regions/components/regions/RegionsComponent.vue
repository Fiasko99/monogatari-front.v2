<script setup>
import ModalViewBtn from '@/components/modal-view-btn/ModalViewBtn.vue';
import Areas from '../areas/AreasComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'

defineProps({
  regions: Array
})

const cdn = import.meta.env.VITE_APP_CDN_URL
</script>
<template>
  <div v-if="regions && regions.length" class="regions">
    <div 
      v-for="region of regions" 
      :key="region.name + region.id" 
      class="region" 
      :style="`background-image: url(${cdn}${region.image});`">
      <first-heading center class="title">
        <ModalViewBtn v-bind="{ name: 'Region', params: {regionId: region.id} }">
          {{ region.name }}
        </ModalViewBtn>
      </first-heading>
      <Areas :areas="region.areas" />
    </div>
  </div>
  <div v-else>
    <first-heading center>В мире нет регионов</first-heading>
  </div>
</template>
<style scoped src="./style.css"></style>

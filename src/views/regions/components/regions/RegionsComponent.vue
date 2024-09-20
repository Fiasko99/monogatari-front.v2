<script setup>
import defImg from '@/heplers/def-img';
import Areas from '../areas/AreasComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue';

defineProps({
  regions: Array
})

</script>
<template>
  <div v-if="regions && regions.length" class="regions">
    <div 
      v-for="region of regions" 
      :key="region.name + region.id" 
      class="region" 
      :style="`background-image: url(${defImg(region.image)});`">
      <first-heading center class="title">
        <CommonLink :to="{ name: 'RegionInRegions', params: {regionId: region.id} }">
          {{ region.name }}
        </CommonLink>
      </first-heading>
      <Areas :areas="region.areas" />
    </div>
  </div>
  <div v-else>
    <first-heading center>В мире нет регионов</first-heading>
  </div>
</template>
<style scoped src="./style.css"></style>

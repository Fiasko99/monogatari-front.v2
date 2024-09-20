<script setup>
import defImg from '@/heplers/def-img';
import Areas from '../areas/AreasComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue';
import AddArea from './add-area/AddArea.vue';

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
      <div class="heading-wrapper">
        <FirstHeading center class="title">
          <CommonLink :to="{ name: 'RegionInRegions', params: {regionId: region.id} }">
            {{ region.name }}
          </CommonLink>
        </FirstHeading>
        <AddArea />
      </div>
      <Areas :areas="region.areas" />
    </div>
  </div>
  <div v-else>
    <FirstHeading center>В мире нет регионов</FirstHeading>
  </div>
</template>
<style scoped src="./style.css"></style>

<script setup>
import Locations from '../locations/LocationsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue';

defineProps({
  areas: Array
})
</script>
<template>
  <div v-if="areas.length > 0" class="areas">
    <div v-for="area of areas" :key="area.id" class="area">
      <div>
        <second-heading center>
          <CommonLink :to="{ name: 'AreaInRegions', params: {areaId: area.id} }">
            {{ area.name }}
          </CommonLink>
        </second-heading>
        <Locations :locations="area.locations" />
      </div>
    </div>
  </div>
  <div v-else class="areas">В регионе нет областей</div>
</template>
<style scoped src="./style.css" />

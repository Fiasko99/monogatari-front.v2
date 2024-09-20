<script setup>
import Locations from '../locations/LocationsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue';
import AddLocation from './components/add-location/AddLocation.vue';

defineProps({
  areas: Array
})
</script>
<template>
  <div v-if="areas.length > 0" class="areas">
    <div v-for="area of areas" :key="area.id" class="area">
      <div>
        <div class="heading-wrapper">
          <SecondHeading center>
            <CommonLink :to="{ name: 'AreaInRegions', params: {areaId: area.id} }">
              {{ area.name }}
            </CommonLink>
          </SecondHeading>
          <AddLocation />
        </div>
        <Locations :locations="area.locations" />
      </div>
    </div>
  </div>
  <div v-else class="areas">В регионе нет областей</div>
</template>
<style scoped src="./style.css" />

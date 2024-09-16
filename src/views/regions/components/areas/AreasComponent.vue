<script setup>
import ModalViewBtn from '@/components/modal-view-btn/ModalViewBtn.vue';
import Locations from '../locations/LocationsComponent.vue'
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue'

defineProps({
  areas: Array
})
</script>
<template>
  <div v-if="areas.length > 0" class="areas">
    <div v-for="area of areas" :key="area.id" class="area">
      <div>
        <second-heading center>
          <ModalViewBtn v-bind="{ name: 'Area', params: {areaId: area.id} }">
            {{ area.name }}
          </ModalViewBtn>
        </second-heading>
        <Locations :locations="area.locations" />
      </div>
    </div>
  </div>
  <div v-else class="areas">В регионе нет областей</div>
</template>
<style scoped src="./style.css"></style>

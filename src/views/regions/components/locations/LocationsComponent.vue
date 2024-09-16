<script setup>
import CommonLink from '@/ui-kit/link/CommonLink.vue'

defineProps({
  locations: Array
})
</script>
<template>
  <div v-if="locations.length > 0" class="locations">
    <div v-for="location of locations" :key="location.id" class="location">
      <common-link class="title" :to="{ name: 'Location', params: { locationId: location.id } }">{{
        location.name
      }}</common-link>
    </div>
  </div>
  <div v-else>В области нет локаций</div>
</template>
<style scoped src="./style.css"></style>

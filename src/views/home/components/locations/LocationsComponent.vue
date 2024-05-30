<script setup>
import { defineProps } from 'vue'
import ThirdHeading from '@/ui-kit/heading/ThirdHeading.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue'

defineProps({
  locations: Array
})
</script>
<template>
  <div v-if="locations.length > 0" class="locations">
    <div v-for="location of locations" :key="location.id" class="location">
      <third-heading class="title">
        <common-link :to="{ name: 'Location', params: { id: location.id } }">{{
          location.name
        }}</common-link>
      </third-heading>
    </div>
  </div>
  <div v-else class="locations">В области нет локаций</div>
</template>
<style scoped src="./style.css"></style>

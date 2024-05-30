<script setup>
import { defineProps } from 'vue'
import Areas from '../areas/AreasComponent.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'

defineProps({
  kingdoms: Array
})
</script>
<template>
  <div v-if="kingdoms" class="kingdoms">
    <div v-for="kingdom of kingdoms" :key="kingdom.name + kingdom.id" class="kingdom">
      <first-heading class="title">{{ kingdom.name }}</first-heading>
      <Areas :areas="kingdom.areas" />
    </div>
  </div>
  <div v-else class="kingdoms">В мире нет регионов</div>
</template>
<style scoped src="./style.css"></style>

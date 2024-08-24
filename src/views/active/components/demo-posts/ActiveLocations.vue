<script setup>
import DemoPost from '@/components/demo-post/DemoPost.vue'

defineProps({
  activeLocations: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="activeLocations">
    <DemoPost
      v-for="activeLocation in activeLocations"
      :key="activeLocation.id"
      :post="activeLocation.post"
      :location="activeLocation.location"
      :character="activeLocation.post.character"
      :user="activeLocation.post.character.user"
    />
  </div>
</template>
<style scoped src="./style.css"></style>

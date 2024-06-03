<script setup>
import { defineProps } from 'vue'
import DemoPost from '@/components/demo-post/DemoPost.vue'

defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="posts">
    <DemoPost v-for="post in posts" :key="post.id" :post="post" :location="post.location" />
  </div>
</template>
<style scoped src="./style.css"></style>

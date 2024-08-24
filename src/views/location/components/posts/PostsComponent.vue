<script setup>
import PostComponent from '@/components/post/PostComponent.vue'

defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="posts">
    <PostComponent
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :user="post.character.user"
      :character="post.character"
    />
  </div>
</template>
<style scoped src="./style.css"></style>

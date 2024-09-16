<script setup>

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

</script>
<template>
  <teleport to="#app">
    <div class="modal">
      <div class="side" @click="closeModal"></div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="side" @click="closeModal"></div>
    </div>
  </teleport>
</template>
<style scoped src="./style.css"></style>

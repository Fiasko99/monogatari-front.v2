<script setup>
defineProps({
  center: Boolean,
  right: Boolean,
})
</script>

<template>
  <div :class="['heading', center && 'center']">
    <slot></slot>
  </div>
</template>

<style scoped>
.heading {
  margin: 2px 0;
  font-weight: bold;
  font-size: 16px;
  color: var(--text);
}
.center {
  text-align: center;
}
</style>

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
  margin: 6px 0;
  font-weight: bolder;
  font-size: 24px;
  color: var(--text);
}
.center {
  text-align: center;
}
</style>

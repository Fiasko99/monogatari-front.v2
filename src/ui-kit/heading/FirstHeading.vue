<script setup></script>

<template>
  <div class="heading">
    <slot></slot>
  </div>
</template>

<style scoped>
.heading {
  margin: 6px 0;
  font-weight: bolder;
  font-size: 32px;
  color: var(--text);
}
</style>

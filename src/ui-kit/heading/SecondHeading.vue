<script setup></script>

<template>
  <div class="heading">
    <slot></slot>
  </div>
</template>

<style scoped>
.heading {
  margin: 4px 0;
  font-weight: bold;
  font-size: 24px;
  color: var(--text);
}
</style>

<script setup></script>

<template>
  <div class="heading">
    <slot></slot>
  </div>
</template>

<style scoped>
.heading {
  margin: 2px 0;
  font-weight: bold;
  font-size: 20px;
  color: var(--text);
}
</style>

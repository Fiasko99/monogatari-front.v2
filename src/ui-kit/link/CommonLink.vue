<script setup></script>

<template>
  <router-link class="link">
    <slot></slot>
  </router-link>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--primary);

  &:hover {
    color: var(--accent);
  }
}
</style>

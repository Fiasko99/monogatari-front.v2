<script setup></script>

<template>
  <router-link class="link">
    <slot></slot>
  </router-link>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--link);

  &:hover {
    color: var(--link-active);
  }
}
</style>

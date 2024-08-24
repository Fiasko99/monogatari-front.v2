<script setup></script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--primary);
  color: var(--text);
  padding: 6px 12px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--accent);
  }

  &:disabled {
    background-color: var(--primary);
    cursor: default;
    opacity: .8;
  }
}
</style>

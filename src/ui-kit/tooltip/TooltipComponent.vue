<script setup>
import { onMounted, ref } from 'vue'

const tooltip = ref(null)
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

onMounted(() => {
  const rootElem = document.querySelector(props.to)
  const rootElemHalfWidth = rootElem.getBoundingClientRect().width / 2
  tooltip.value.style.transform = `translate(calc(-1 * (50% - ${rootElemHalfWidth}px)))`
})
</script>

<template>
  <teleport :to="to">
    <div class="tooltip" ref="tooltip">
      <div class="beak"></div>
      <div class="tooltip-content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<style scoped src="./style.css" />

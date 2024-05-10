<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  view: String,
  previousView: String
})

function closeModal() {
  router.push({ name: props.previousView })
  router.removeRoute('Modal' + props.previousView)
}

function openPage() {
  router.push({ name: props.view })
}
</script>
<template>
  <teleport to="#app">
    <div class="modal">
      <div class="slot">
        <div class="btns">
          <button @click="closeModal" class="btn">Закрыть модалку</button>
          <button @click="openPage" class="btn">Открыть страницу</button>
        </div>
        <router-view />
      </div>
    </div>
  </teleport>
</template>
<style scoped src="./style.css"></style>

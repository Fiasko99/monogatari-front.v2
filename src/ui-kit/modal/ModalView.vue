<script setup>
import { useRouter } from 'vue-router'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
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
          <CommonBtn @click="closeModal">Закрыть модалку</CommonBtn>
          <CommonBtn @click="openPage">Открыть страницу</CommonBtn>
        </div>
        <router-view />
      </div>
    </div>
  </teleport>
</template>
<style scoped src="./style.css"></style>

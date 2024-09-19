<script setup>
import { useRoute, useRouter } from 'vue-router'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
import ModalComponent from '@/ui-kit/modal/ModalComponent.vue'
const router = useRouter()
const route = useRoute()

const [nextPage, previousPage] = route.name.split('In')

function closeModal() {
  router.push({ name: previousPage })
}

function openPage() {
  router.push({ name: nextPage })
}
</script>
<template>
  <modal-component @close-modal="closeModal">
    <div class="buttons">
      <CommonBtn @click="closeModal">Закрыть модалку</CommonBtn>
      <CommonBtn @click="openPage">Открыть страницу</CommonBtn>
    </div>
    <router-view />
  </modal-component>
</template>
<style scoped src="./style.css"></style>

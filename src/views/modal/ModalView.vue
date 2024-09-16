<script setup>
import { useRouter } from 'vue-router'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
import ModalComponent from '@/ui-kit/modal/ModalComponent.vue'
const router = useRouter()

const props = defineProps({
  view: Object,
  previousView: Object
})

function closeModal() {
  router.push(props.previousView)
  router.removeRoute('Modal' + props.previousView.name)
}

function openPage() {
  router.push(props.view)
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

<script setup>
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue';
import ModalComponent from '@/ui-kit/modal/ModalComponent.vue';
import { ref } from 'vue';
const addNewRegion = ref(false)

const changeAddNewRegion = () => {
  addNewRegion.value = !addNewRegion.value
}
</script>
<template>
  <div class="add-area">
    <CommonBtn @click="changeAddNewRegion">+</CommonBtn>
    <modal-component v-if="addNewRegion" @close-modal="changeAddNewRegion">
      Новая область
    </modal-component>
  </div>
</template>
<style scoped src="./style.css"></style>

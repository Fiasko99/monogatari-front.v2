<script setup>
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue';
import ModalComponent from '@/ui-kit/modal/ModalComponent.vue';
import { ref } from 'vue';
const addNewLocation = ref(false)

const changeAddNewLocation = () => {
  addNewLocation.value = !addNewLocation.value
}
</script>
<template>
  <div class="add-location">
    <CommonBtn @click="changeAddNewLocation">+</CommonBtn>
    <modal-component v-if="addNewLocation" @close-modal="changeAddNewLocation">
      Новая локация
    </modal-component>
  </div>
</template>
<style scoped src="./style.css"></style>

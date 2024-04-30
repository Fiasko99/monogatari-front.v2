<script setup>
defineProps({
  characters: Array
})
</script>
<template>
  <div v-if="characters.length > 0">
    <h1 align="center">Персонажи</h1>
    <div class="characters">
      <div class="character" v-for="character of characters" :key="character.id">
        <router-link :to="`/character/${character.id}`" class="name">{{
          character.name
        }}</router-link>
        <div class="active">{{ character.active ? 'Активен' : 'Неактивен' }}</div>
      </div>
    </div>
  </div>
  <div v-else>У пользователя нет персонажей</div>
</template>
<style scoped src="./style.css"></style>

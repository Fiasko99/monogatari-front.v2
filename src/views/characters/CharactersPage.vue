<script setup>
import Fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  characters: Array
})

const emit = defineEmits(['updateData'])
const user = userStore()
const route = useRoute()
const fetcher = Fetcher()
const addNewCharacter = ref(false)
const nameNewCharacter = ref('')
function changeAddNewCharacter() {
  addNewCharacter.value = !addNewCharacter.value
}
function createNewCharacter() {
  const data = {
    name: nameNewCharacter.value
  }
  fetcher
    .post('/character/create', data)
    .then(() => emit('updateData'))
    .catch((err) => console.error(err))
}
function activateCharacter(characterId) {
  fetcher
    .get('/character/activate/' + characterId)
    .then((res) => {
      user.fieldCharacter(res)
      emit('updateData')
    })
    .catch((err) => console.error(err))
}
</script>
<template>
  <div v-if="characters.length > 0">
    <div class="title">
      <h1>Персонажи</h1>
      <button
        v-if="route.params.nickname === user.data.nickname"
        @click="changeAddNewCharacter"
        class="add-new-character"
      >
        +
      </button>
    </div>
    <div v-if="addNewCharacter" class="form-new-character">
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-name">Имя персонажа</label>
        <input
          class="form-group-input"
          id="mono-gatari-name"
          type="text"
          v-model="nameNewCharacter"
        />
      </div>
      <div class="btns">
        <button @click="createNewCharacter" class="create">Создать</button>
      </div>
    </div>
    <div class="characters">
      <div class="character" v-for="character of characters" :key="character.id">
        <router-link :to="{ name: 'Character', params: { id: character.id } }" class="name">{{
          character.name
        }}</router-link>
        <div>{{ new Date(character.createdAt).getMilliseconds() }}ms</div>
        <button
          :disabled="character.active"
          @click="activateCharacter(character.id)"
          class="active"
        >
          {{ character.active ? 'Активен' : 'Неактивен' }}
        </button>
      </div>
    </div>
  </div>
  <div v-else>У пользователя нет персонажей</div>
</template>
<style scoped src="./style.css"></style>

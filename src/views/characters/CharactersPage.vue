<script setup>
import Fetcher from '@/Fetcher'
import { userStore } from '@/stores/user'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import ThirdHeading from '@/ui-kit/heading/ThirdHeading.vue'
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue'

const user = userStore()
const route = useRoute()
const fetcher = Fetcher()

const characters = ref()
const loadingCharacters = ref(true)
const addNewCharacter = ref(false)
const nameNewCharacter = ref('')
const loadAvatar = ref(false)
let avatarNewCharacter = ''

const nickname = route.params.nickname
const selfProfile = computed(() => nickname === user.data.nickname)

function changeAddNewCharacter() {
  addNewCharacter.value = !addNewCharacter.value
}

function selectAvatar(e) {
  loadAvatar.value = true
  const file = e.target.files[0]
  if (file.size > 1024 * 1024) {
    return
  }
  var reader = new FileReader()
  reader.onload = function () {
    avatarNewCharacter = reader.result
    loadAvatar.value = false
  }
  reader.onerror = function (error) {
    console.error('Error: ', error)
  }
  reader.readAsDataURL(file)
}

function createNewCharacter() {
  loadAvatar.value = true
  const data = {
    name: nameNewCharacter.value
  }
  if (avatarNewCharacter) {
    data.image = avatarNewCharacter
  }
  fetcher
    .post('/character/create', data)
    .then(() => updateData())
    .catch((err) => console.error(err))
    .finally(() => (loadAvatar.value = false))
}

function activateCharacter(characterId) {
  fetcher
    .get('/character/activate/' + characterId)
    .then(() => {
      user.fieldCharacter()
      updateData()
    })
    .catch((err) => console.error(err))
}

function updateData() {
  fetcher
    .get(`/character/user/${nickname}`)
    .then((res) => (characters.value = res))
    .catch((err) => console.error(err))
    .finally(() => loadingCharacters.value = false)
}

onMounted(() => {
  updateData()
})
</script>
<template>
  <div>
    <div class="title">
      <FirstHeading>Персонажи</FirstHeading>
      <CommonBtn v-if="selfProfile" @click="changeAddNewCharacter" class="add-new-character">
        Добавить
      </CommonBtn>
    </div>
    <div v-if="addNewCharacter" class="form-new-character">
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-character-name">Имя персонажа</label>
        <input
          class="form-group-input"
          id="mono-gatari-character-name"
          type="text"
          :disabled="loadAvatar"
          v-model="nameNewCharacter"
        />
      </div>
      <div class="form-group">
        <label class="form-group-label" for="mono-gatari-character-avatar">Аватар</label>
        <input
          class="form-group-input"
          id="mono-gatari-character-avatar"
          type="file"
          :disabled="loadAvatar"
          @change="selectAvatar"
        />
      </div>
      <div class="btns">
        <CommonBtn @click="createNewCharacter" class="create" :disabled="loadAvatar"
          >Создать</CommonBtn
        >
      </div>
    </div>
    <CommonLoading v-if="loadingCharacters" />
    <div class="charactersWrapper" v-else>
      <div class="characters" v-if="characters">
        <div
        v-for="character of characters"
        :class="['character', character.active && 'active']"
        :key="character.id"
        >
          <ThirdHeading>
            <CommonLink :to="{ name: 'Character', params: { id: character.id } }" class="name">{{
              character.name
            }}</CommonLink>
          </ThirdHeading>
          <div class="imageWrapper">
            <img class="image" :src="character.avatar" @error="returnDefaul" alt="" />
          </div>
          <div class="btns" v-if="selfProfile">
            <label class="toggler" title="Активировать" @click="activateCharacter(character.id)">
              <input
                type="checkbox"
                class="switcher"
                :checked="character.active"
                :disabled="character.active"
              />
              <div class="toggle"></div>
            </label>
          </div>
        </div>
      </div>
      <div v-else>У пользователя нет персонажей</div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>

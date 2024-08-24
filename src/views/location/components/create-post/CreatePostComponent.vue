<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import Fetcher from '@/Fetcher'
import CommonBtn from '@/ui-kit/btn/CommonBtn.vue'

const emit = defineEmits(['updateData'])
const route = useRoute()
const user = userStore()
const fetcher = Fetcher()
const postText = ref('')
const isShowPostForm = ref(false)
const activeCharacter = user.activeCharacter

function sendPost() {
  const data = {
    text: postText.value.innerHTML,
    characterId: activeCharacter.id,
    locationId: route.params.id
  }
  fetcher
    .post('/post/create', data)
    .then(() => emit('updateData'))
    .catch((err) => console.error(err))
}

function applyFormatterText(type, tag = null) {
  postText.value.focus()
  document.execCommand(type, false, tag)
}

function paste(e) {
  e.preventDefault()
  var text = (e.originalEvent || e).clipboardData.getData('text/plain')
  document.execCommand('insertHTML', false, text)
}

function showCreatePost() {
  isShowPostForm.value = !isShowPostForm.value
}
</script>

<template>
  <div v-if="activeCharacter" class="create-post">
    <CommonBtn @click="showCreatePost">Написать пост</CommonBtn>
    <div v-if="isShowPostForm" class="post-form">
      <div class="style-btns">
        <CommonBtn @click="applyFormatterText('bold')">strong</CommonBtn>
        <CommonBtn @click="applyFormatterText('italic')">em</CommonBtn>
        <CommonBtn @click="applyFormatterText('strikeThrough')">strike</CommonBtn>
        <CommonBtn @click="applyFormatterText('underline')">underline</CommonBtn>
        <CommonBtn @click="applyFormatterText('formatBlock', '<h1>')"> heading1 </CommonBtn>
        <CommonBtn @click="applyFormatterText('formatBlock', '<h2>')"> heading2 </CommonBtn>
        <CommonBtn @click="applyFormatterText('formatBlock', '<h3>')"> heading3 </CommonBtn>
        <CommonBtn @click="applyFormatterText('formatBlock', '<blockquote>')"> qoute </CommonBtn>
        <CommonBtn @click="applyFormatterText('formatBlock', 'div')"> delete styles </CommonBtn>
      </div>
      <pre class="textarea" contenteditable="true" @paste="paste" ref="postText"></pre>
      <div class="btns">
        <CommonBtn @click="sendPost">Отправить</CommonBtn>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>

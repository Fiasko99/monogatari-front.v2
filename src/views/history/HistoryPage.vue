<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useModal from '@/helpers/openModal/index.js'

const openModal = useModal(useRouter())
const fetcher = Fetcher('richHtml')

const history = ref()
onMounted(() => {
  fetcher
    .get('/history')
    .then((res) => (history.value = res))
    .catch((err) => console.error(err))
})
</script>
<template>
  <div>
    <button @click="openModal('Home')">Модалка</button>
    <h1 align="center">История мира</h1>
    <div v-if="history" class="history">
      <div v-for="{ key, title, content } in history" :key="key" class="chapter">
        <component :is="title.tag" v-bind="title.attributes">{{ title.text }}</component>
        <div class="content">
          <component
            v-for="item in content"
            v-bind="item.attributes"
            :key="key + item"
            :is="item.tag"
            >{{ item.text }}</component
          >
        </div>
      </div>
    </div>
    <div v-else>Пока живем без лора Щ_Щ</div>
    <router-view />
  </div>
</template>
<style scoped src="./style.css"></style>

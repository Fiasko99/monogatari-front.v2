<script setup>
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'

const events = ref()
const fetcher = Fetcher('richHtml')
onMounted(() => {
  fetcher
    .get('/events')
    .then((res) => (events.value = res))
    .catch((err) => console.error(err))
})
</script>
<template>
  <div>
    <h1 align="center">События</h1>
    <div v-if="events" class="events">
      <div v-for="{ key, title, content } in events" :key="key" class="event">
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
    <div v-else>Пока живем без событий Щ_Щ</div>
  </div>
</template>
<style scoped src="./style.css"></style>

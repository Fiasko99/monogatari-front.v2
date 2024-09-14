<script setup>
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue';
import Fetcher from '@/Fetcher'
import { onMounted, ref } from 'vue'
const fetcher = Fetcher('richHtml')
const rules = ref()
onMounted(() => {
  fetcher
    .get('/rules')
    .then((res) => (rules.value = res))
    .catch((err) => console.error(err))
})
</script>
<template>
  <div>
    <first-heading center>Правила</first-heading>
    <div v-if="rules" class="rules">
      <div v-for="{ key, title, content } in rules" :key="key" class="rule">
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
    <div v-else>Правила не определены</div>
  </div>
</template>
<style scoped src="./style.css"></style>

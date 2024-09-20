<script setup>
import Fetcher from '@/Fetcher';
import defImg from '@/heplers/def-img';
import FirstHeading from '@/ui-kit/heading/FirstHeading.vue';
import SecondHeading from '@/ui-kit/heading/SecondHeading.vue';
import CommonLoading from '@/ui-kit/loading/CommonLoading.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const fetcher = Fetcher() 

const regionId = route.params.regionId
const region = ref(null) 
const loading = ref(false)

onMounted(() => {
  loading.value = true
  fetcher.get(`/region/${regionId}`)
    .then(res => region.value = res)
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
})

</script>
<template>
  <CommonLoading v-if="loading" />
  <div v-else>
    <div v-if="region">
      <FirstHeading center>
        {{ region.name }}
      </FirstHeading>
      <div class="imageWrapper">
        <img :src="defImg(region.image)">
      </div>
      <div class="description">
        Описание: {{ region.description ? region.description : 'Описание отсутствует' }}
      </div>
    </div>
    <SecondHeading v-else center>Регион не найден</SecondHeading>
  </div>
</template>
<style scoped src="./style.css"></style>

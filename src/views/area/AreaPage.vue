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

const areaId = route.params.areaId
const area = ref(null) 
const loading = ref(false)

onMounted(() => {
  loading.value = true
  fetcher.get(`/area/${areaId}`)
    .then(res => area.value = res)
    .catch(err => console.log(err))
    .finally(() => loading.value = false)
})

</script>
<template>
  <CommonLoading v-if="loading" />
  <div v-else>
    <div v-if="area">
      <FirstHeading center>
        {{ area.name }}
      </FirstHeading>
      <div class="imageWrapper">
        <img :src="defImg(area.image)">
      </div>
      <div class="description">
        Описание: {{ area.description ? area.description : 'Описание отсутствует' }}
      </div>
    </div>
    <SecondHeading v-else center>Область не найдена</SecondHeading>
  </div>
</template>
<style scoped src="./style.css"></style>

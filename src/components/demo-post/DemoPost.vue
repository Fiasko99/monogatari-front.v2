<script setup>
import CommonLink from '@/ui-kit/link/CommonLink.vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const routeName = route.name

defineProps({
  post: {
    type: Object,
    required: true
  },
  location: {
    type: Object,
    required: true
  },
  character: {
    type: Object,
    required: false
  },
  user: {
    type: Object,
    required: false
  }
})

function returnDefault(e) {
  e.target.src = `${import.meta.env.VITE_APP_CDN_URL}/default/characterAvatar.svg`
}

function getTime(time) {
  const date = new Date(time)
  const nowDate = new Date()
  let customTimeStr = ''
  const weaks = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  const timings = {
    minute: 1000 * 60,
    day: 1000 * 60 * 60 * 24,
    yesterday: 1000 * 60 * 60 * 24 * 2,
    weak: 1000 * 60 * 60 * 24 * 7
  }

  if (nowDate.getTime() - date.getTime() < timings.minute) {
    customTimeStr = 'Меньше минуты'
  } else if (nowDate.getDay() === date.getDay()) {
    customTimeStr = `Сегодня в ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getTime() === date.getTime() + timings.day) {
    customTimeStr = `Вчера в ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getTime() - date.getTime() < timings.weak) {
    customTimeStr = `${weaks[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`
  } else if (nowDate.getMonth() >= date.getMonth()) {
    customTimeStr = `${months[date.getMonth()]} ${date.getHours()}:${date.getMinutes()}`
  } else {
    customTimeStr = date.toLocaleString()
  }
  return customTimeStr
}
</script>
<template>
  <div class="post">
    <div class="top">
      <div class="path">
        <CommonLink :to="{ name: `RegionIn${routeName}`, params: { regionId: location.area.region.id } }">
          {{ location.area.region.name }} 
        </CommonLink>
        &#11166; 
        <CommonLink :to="{ name: `AreaIn${routeName}`, params: { areaId: location.area.id } }">
          {{ location.area.name }} 
        </CommonLink>
        &#11166;
        <CommonLink :to="{ name: 'Location', params: { locationId: location.id } }">
          {{ location.name }}
        </CommonLink>
      </div>
      <div class="info">
        <CommonLink
          v-if="user"
          :to="{
            name: 'Characters',
            params: { nickname: user.nickname }
          }"
          >{{ user.nickname }}</CommonLink
        >
      </div>
    </div>
    <div class="post-info">
      <div class="text" v-html="post.text"></div>
      <div class="info">
        <span>{{ getTime(post.createdAt) }}</span>
        <div v-if="character" class="character">
          <CommonLink :to="{ name: 'Character', params: { characterId: character.id } }">{{
            character.name
          }}</CommonLink>
          <div class="imageWrapper">
            <img class="image" :src="post.character.avatar" @error="returnDefault" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="./style.css"></style>
